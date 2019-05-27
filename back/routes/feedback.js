const services = require('../services/requests');
const eJwt = require('express-jwt');
const config = require('../config/config.js');
const sanitizer = require('sanitizer');

exports.default = (app, con) => {

    app.post('/feedbacks', eJwt({secret: config.secret}), (req, res) => {
        services.postRequest(req, res, con, "feedbacks", "content, user_id, box_id");
    })
    .get('/feedbacks', (req, res) => {
        services.getRequest(req, res, con, "feedbacks", "*");
    })
    .get('/feedbacks/:box_id', (req, res) => {
        services.getRequest(req, res, con, "feedbacks", "*", `box_id=${sanitizer.sanitize(req.params.box_id)}`);
    })
    .put('/feedbacks/:id', eJwt({secret: config.secret}), (req, res) => {
        services.putRequest(req, res, con, "feedbacks", `id_feedback=${sanitizer.sanitize(req.params.id)}`)
    })
    .delete('/feedbacks/:id', eJwt({secret: config.secret}), (req, res) => {
        services.deleteRequest(req, res, con, "feedbacks", `id_feedback=${sanitizer.sanitize(req.params.id)}`)
    });

}