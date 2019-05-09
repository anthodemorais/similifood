const services = require('../services/requests');
const eJwt = require('express-jwt');
const config = require('../config/config.js');
const sanitizer = require('sanitizer');

exports.default = (app, con) => { 

    app.post('/order', eJwt({secret: config.secret}), (req, res) => {

    var user_id  = sanitizer.sanitize(req.body.user_id),
        box_id   = sanitizer.sanitize(req.body.box_id),
        adress   = sanitizer.sanitize(req.body.adress),
        quantity = sanitizer.sanitize(req.body.quantity);

        var date_of_order = new Date();
        var dd = String(date_of_order.getDate()).padStart(2, '0');
        var mm = String(date_of_order.getMonth() + 1).padStart(2, '0');
        var yyyy = date_of_order.getFullYear();
        date_of_order = dd + '/' + mm + '/' + yyyy;

        var query = `INSERT INTO orders (status, user_id, box_id, adress, date_of_order, quantity)
                    VALUES ('ordered', ?, ?, ?, str_to_date(?, '%d/%m/%Y'), ?)`
        con.query(query, [user_id, box_id, adress, date_of_order, quantity], (err, result, fields) => {
            if (err) {
                res.status(500);
                res.json({error: err});
            }
            res.status(200);
            res.json({result: result});
        });
    })
    .delete('/order/:id', eJwt({secret: config.secret}), (req, res) => {
        services.deleteRequest(req, res, con, "orders", `id_order=${sanitizer.sanitize(req.params.id)}`)
    });

}