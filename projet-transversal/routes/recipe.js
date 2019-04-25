const services = require('../services/requests');
const eJwt = require('express-jwt');
const config = require('../config/config.js');

exports.default = (app, con) => {

    app.post('/recipe', eJwt({secret: config.secret}), (req, res) => {
        if (!req.user.admin) return res.sendStatus(401);    
        services.postRequest(req, res, con, "recipes", "name, steps, preparation_time, cook_time, difficulty");
    })
    .get('/recipes/:recipe_id', (req, res) => {
        services.getRequest(req, res, con, "recipes", "*", `id_recipe=${req.params.recipe_id}`).then((result) => {
            con.connect((err) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                }
                
                con.query(`SELECT tool FROM tools AS t
                            INNER JOIN recipe_has_tools AS rht
                            ON t.id_tool = rht.tool_id
                            WHERE rht.recipe_id = ?`, [req.params.recipe_id], (err, result2, fields) => {
                    
                    if (err) {
                        res.status(500);
                        res.send(err);
                    }

                    result += result2;
                })

                con.query(`SELECT ingredient FROM ingredients AS i
                            INNER JOIN recipe_has_ingredients AS rhi
                            ON i.id_ingredient = rhi.ingredient_id
                            WHERE rhi.recipe_id = ?`, [req.params.recipe_id], (err, result3, fields) => {
                                
                    if (err) {
                        res.status(500);
                        res.send(err);
                    }

                    result += result3;

                    res.status(200);
                    res.send(result);
                })

            });
        })
        
    })
    .post('/recipes/ingredients/:recipe_id', eJwt({secret: config.secret}), (req, res) => {
        if (!req.user.admin) return res.sendStatus(401);

        con.connect((err) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            con.query(`SELECT id_ingredient FROM ingredients WHERE ingredient=?`, [req.body.ingredient], (err, result, fields) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                }

                if (result.length != 0)
                {
                    con.query(`INSERT INTO recipe_has_ingredients(ingredient_id, recipe_id, quantity)
                                VALUES (?, ?, ?)`, [result.id_ingredient, req.params.recipe_id, req.body.quantity], (err, result, fields) => {

                        if (err) {
                            res.status(500);
                            res.send(err);
                        }
                        res.status(200);
                        res.send(result);
                    });
                }
                else
                {
                    services.addIntoTable("ingredients", "ingredient", [req.body.ingredient]).then((result2) => {
                        con.query(`INSERT INTO recipe_has_ingredients(ingredient_id, recipe_id, quantity)
                                    VALUES (?, ?, ?)`, [result2.insertId, req.params.recipe_id, req.body.quantity], (err, result3, fields) => {

                            if (err) {
                                res.status(500);
                                res.send(err);
                            }
                            res.status(200);
                            res.send(result3);
                        });
                    });
                }
            });
        });
    })
    .post('/recipes/tools/:recipe_id', eJwt({secret: config.secret}), (req, res) => {
        if (!req.user.admin) return res.sendStatus(401);

        con.connect((err) => {
            if (err) {
                res.status(500);
                res.send(err);
            }
            con.query(`SELECT id_tool FROM tools WHERE tool=?`, [req.body.tool], (err, result, fields) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                }

                if (result.length != 0)
                {
                    con.query(`INSERT INTO recipe_has_tools(tool_id, recipe_id)
                                VALUES (?, ?)`, [result.id_tool, req.params.recipe_id], (err, result, fields) => {
                        resolve(result);
                    });
                }
                else
                {
                    services.addIntoTable("tools", "tool", [req.body.tool]).then((result2) => {
                        con.query(`INSERT INTO recipe_has_tools(tool_id, recipe_id)
                                    VALUES (?, ?, ?)`, [result2.insertId, req.params.recipe_id], (err, result3, fields) => {

                            if (err) {
                                res.status(500);
                                res.send(err);
                            }
                            res.status(200);
                            res.send(result3);
                        });
                    });
                }
            });
        });
    })
    .put('/recipe/:id', eJwt({secret: config.secret}), (req, res) => {
        if (!req.user.admin) return res.sendStatus(401);
        services.putRequest(req, res, con, "recipes", `id_recipe=${req.params.id}`);
    })
    .delete('/recipe/:id', eJwt({secret: config.secret}), (req, res) => {
        if (!req.user.admin) return res.sendStatus(401);
        services.deleteRequest(req, res, con, "recipes", `id_recipes=${req.params.id}`)
    })
    .delete('/recipes/:id/ingredients/:id_ingredient', eJwt({secret: config.secret}), (req, res) => {
        if (!req.user.admin) return res.sendStatus(401);
        services.deleteRequest(req, res, con, "recipe_has_ingredients", `recipe_id=${req.params.id} AND ingredient_id=${req.params.id_ingredient}`)
    })
    .delete('/recipes/:id/tools/:id_tool', eJwt({secret: config.secret}), (req, res) => {
        if (!req.user.admin) return res.sendStatus(401);
        services.deleteRequest(req, res, con, "recipe_has_tools", `recipe_id=${req.params.id} AND ingredient_id=${req.params.id_tool}`)
    });

}