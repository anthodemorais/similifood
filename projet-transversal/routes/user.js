const services = require('../services/requests');
const passwordHash = require("password-hash");
const jwt = require('jwt-simple');
const config = require('../config/config.js');
const eJwt = require('express-jwt');

exports.default = (app, con) => { 

    app.post('/auth', (req, res) => {

        var email    = req.body.email,
            password = req.body.password;
    
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (re.test(String(email).toLowerCase()) && password.length >= 6)
        {

            con.connect((err) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                }
                con.query(`SELECT * FROM users WHERE email=?`, [email], (err, result, fields) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    }

                    if (result.length != 0)
                    {
                        if (!passwordHash.verify(password, result[0].password))
                        {
                            reject("Email or password incorrect");
                        }
                        let token = jwt.encode(this, config.secret);
                        res.status(200);
                        res.send(token);
                    }
                    else
                    {
                        res.status(500);
                        res.send("Email or password incorrect");
                    }
                });
            });
        }
        else
        {
            res.status(400);
            res.send("Email or password incorrect")
        }
    })
    .post('/register', (req, res) => {
        services.postRequest(req, res, "users", "email, password");
    })
    .put('/user/:id', eJwt({secret: config.secret}), (req, res) => {
        services.putRequest(req, res, "users", `id_user=${req.params.id}`);
    })
    .delete('/user/:id', eJwt({secret: config.secret}), (req, res) => {
        services.deleteRequest(req, res, "users", `id_user=${req.params.id}`)
    });
    
}