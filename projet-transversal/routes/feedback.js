const services = require('../services/requests');
const eJwt = require('express-jwt');
const config = require('../config/config.js');

exports.default = (app, con) => {

    app.post('/feedback', eJwt({secret: config.secret}), (req, res) => {
        services.postRequest(req, res, con, "feedbacks", "content, user_id, box_id");
    })
    .get('/feedbacks/:box_id', (req, res) => {
        services.getRequest(req, res, con, "feedbacks", "*", `box_id=${req.params.box_id}`);
    })
    .put('/feedbacks/:id', eJwt({secret: config.secret}), (req, res) => {
        services.putRequest(req, res, con, "feedbacks", `id_feedback=${req.params.id}`)
    })
    .delete('/feedbacks/:id', eJwt({secret: config.secret}), (req, res) => {
        services.deleteRequest(req, res, con, "feedbacks", `id_feedback=${req.params.id}`)
    });

}