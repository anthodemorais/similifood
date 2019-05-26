const services = require('../services/requests');
const passwordHash = require("password-hash");
const jwt = require('jwt-simple');
const config = require('../config/config.js');
const eJwt = require('express-jwt');
const sanitizer = require('sanitizer');

exports.default = (app, con) => { 

    app.get('/user/:id', (req, res) => {
        services.getRequest(req, res, con, "users", "email, points", `id_user=${sanitizer.sanitize(req.params.id)}`);
    }).post('/auth', (req, res) => {

        var email    = sanitizer.sanitize(req.body.email),
            password = sanitizer.sanitize(req.body.password);
    
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (re.test(String(email).toLowerCase()) && password.length >= 6)
        {
            con.query(`SELECT * FROM users WHERE email=?`, [email], (err, result, fields) => {
                if (err) {
                    res.status(500);
                    res.json({error: err});
                }

                if (result.length != 0)
                {
                    if (!passwordHash.verify(password, result[0].password))
                    {
                        res.status(500);
                        res.json({err: "Email or password incorrect"});
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

                    console.log(result[0].id_user);
                    req.session.id_user = result[0].id_user;
                    console.log(req.session);
                    res.status(200);
                    res.json({token: token, id_user: result[0].id_user, admin: result[0].admin});
                }
                else
                {
                    res.status(500);
                    res.json({err: "Email or password incorrect"});
                }
            });
        }
        else
        {
            res.status(400);
            res.json({err: "Email or password incorrect"});
        }
    })
    .post('/register', (req, res) => {
        services.postRequest(req, res, con, "users", "email, password, name");
    })
    .put('/user/:id', eJwt({secret: config.secret}), (req, res) => {
        services.putRequest(req, res, con, "users", `id_user=${sanitizer.sanitize(req.params.id)}`);
    })
    .delete('/user/:id', eJwt({secret: config.secret}), (req, res) => {
        services.deleteRequest(req, res, con, "users", `id_user=${sanitizer.sanitize(req.params.id)}`)
    });
    
}