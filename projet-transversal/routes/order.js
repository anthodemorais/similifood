const services = require('../services/requests');
const eJwt = require('express-jwt');
const config = require('../config/config.js');

exports.default = (app, con) => { 

    app.post('/order', eJwt({secret: config.secret}), (req, res) => {

    var user_id  = req.body.user_id,
        box_id   = req.body.box_id,
        adress   = req.body.adress,
        quantity = req.body.quantity;

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
                res.send(err);
            }
            res.status(200);
            res.send(result);
        });
    })
    .delete('/order/:id', eJwt({secret: config.secret}), (req, res) => {
        services.deleteRequest(req, res, con, "orders", `id_order=${req.params.id}`)
    });

}