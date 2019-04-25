const services = require('../services/requests');
const eJwt = require('express-jwt');
const config = require('../config/config.js');

exports.default = (app, con) => {

    app.get('/products', (req, res) => {
        services.getRequest(req, res, con, "boxes", "*");
    })
    .post('/products', eJwt({secret: config.secret}), (req, res) => {
        if (!req.user.admin) return res.sendStatus(401);
        services.postRequest(req, res, con, "boxes", "name, price, description");
    })
    .put('/products/:id', eJwt({secret: config.secret}), (req, res) => {
        if (!req.user.admin) return res.sendStatus(401);
        services.putRequest(req, res, con, "boxes", `id_box=${req.params.id}`)
    })
    .delete('/products/:id', eJwt({secret: config.secret}), (req, res) => {
        if (!req.user.admin) return res.sendStatus(401);
        services.deleteRequest(req, res, con, "boxes", `id_box=${req.params.id}`)
    });

}