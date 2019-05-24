const services = require('../services/requests');
const eJwt = require('express-jwt');
const config = require('../config/config.js');
const sanitizer = require('sanitizer');

exports.default = (app, con) => {

    app.get('/products', (req, res) => {
        services.getRequest(req, res, con, "boxes", "*");
    })
    .get('/products/:id', (req, res) => {
        services.getRequest(req, res, con, "boxes", "*", `id_box=${sanitizer.sanitize(req.params.id)}`);
    })
    .post('/products', eJwt({secret: config.secret}), (req, res) => {
        if (!req.session.admin) return res.sendStatus(401);
        services.postRequest(req, res, con, "boxes", "name, price, description, animal, img_name");
    })
    .put('/products/:id', eJwt({secret: config.secret}), (req, res) => {
        if (!req.session.admin) return res.sendStatus(401);
        services.putRequest(req, res, con, "boxes", `id_box=${sanitizer.sanitize(req.params.id)}`)
    })
    .delete('/products/:id', eJwt({secret: config.secret}), (req, res) => {
        if (!req.session.admin) return res.sendStatus(401);
        services.deleteRequest(req, res, con, "boxes", `id_box=${sanitizer.sanitize(req.params.id)}`)
    });

}