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
            con.query(`SELECT * FROM users WHERE email=?`, [email], (err, result, fields) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                }

                if (result.length != 0)
                {
                    if (!passwordHash.verify(password, result[0].password))
                    {
                        res.status(500);
                        res.send("Email or password incorrect");
                    }

                    if (result[0].admin == 1)
                    {
                        req.session.admin = true;
                    }
                    else
                    {
                        req.session.admin = false;
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
        }
        else
        {
            res.status(400);
            res.send("Email or password incorrect")
        }
    })
    .post('/register', (req, res) => {
        services.postRequest(req, res, con, "users", "email, password");
    })
    .put('/user/:id', eJwt({secret: config.secret}), (req, res) => {
        services.putRequest(req, res, con, "users", `id_user=${req.params.id}`);
    })
    .delete('/user/:id', eJwt({secret: config.secret}), (req, res) => {
        services.deleteRequest(req, res, con, "users", `id_user=${req.params.id}`)
    });
    
}