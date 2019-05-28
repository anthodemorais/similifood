const services = require('../services/requests');
const eJwt = require('express-jwt');
const config = require('../config/config.js');
const sanitizer = require('sanitizer');

exports.default = (app, con) => {

    app.post('/recipe', eJwt({secret: config.secret}), (req, res) => {
        if (!req.body.admin) return res.sendStatus(401); 
        services.postRequest(req, res, con, "recipes", "name, steps, preparation_time, cook_time, difficulty, id_box");
    })
    .get('/recipes/:box_id', (req, res) => {
        let tools = {},
            ingredients = {};
        con.query(`SELECT * FROM recipes WHERE id_box=${sanitizer.sanitize(req.params.box_id)}`, (err, result, fields) => {
            if (err) {
                res.status(500);
                res.json({error: err});
            }

            con.query(`SELECT tool FROM tools AS t
                        INNER JOIN recipe_has_tools AS rht
                        ON t.id_tool = rht.tool_id
                        WHERE rht.recipe_id = ?`, [result[0].id_recipe], (err, result2, fields) => {
                
                if (err) {
                    res.status(500);
                    res.json({error: err});
                }

                tools = result2;
            })

            con.query(`SELECT ingredient, quantity FROM ingredients AS i
                        INNER JOIN recipe_has_ingredients AS rhi
                        ON i.id_ingredient = rhi.ingredient_id
                        WHERE rhi.recipe_id = ?`, [result[0].id_recipe], (err, result3, fields) => {
                            
                if (err) {
                    res.status(500);
                    res.json({error: err});
                }

                ingredients = result3;

                res.status(200);
                res.json({result: result[0], tools: tools, ingredients: ingredients});
            })

        });        
    })
    .post('/recipes/ingredients/:recipe_id', eJwt({secret: config.secret}), (req, res) => {
        if (!req.body.admin) return res.sendStatus(401);
        con.query(`SELECT id_ingredient FROM ingredients WHERE ingredient=?`, [sanitizer.sanitize(req.body.ingredient)], (err, result, fields) => {
            if (err) {
                res.status(500);
                res.json({error: err});
            }

            if (result.length != 0)
            {
                con.query(`INSERT INTO recipe_has_ingredients(ingredient_id, recipe_id, quantity)
                            VALUES (?, ?, ?)`, [result.id_ingredient, sanitizer.sanitize(req.params.recipe_id), sanitizer.sanitize(req.body.quantity)], (err, result2, fields) => {
                    if (err) {
                        res.status(500);
                        res.json({error: err});
                    }
                    res.status(200);
                    res.json({result: result2});
                });
            }
            else
            {
                con.query(`INSERT INTO ingredients(ingredient) VALUES (?)`, [sanitizer.sanitize(req.body.ingredient)], (err, result2, fields) => {
                    con.query(`INSERT INTO recipe_has_ingredients(ingredient_id, recipe_id, quantity)
                                VALUES (?, ?, ?)`, [result2.insertId, sanitizer.sanitize(req.params.recipe_id), sanitizer.sanitize(req.body.quantity)], (err, result3, fields) => {

                        if (err) {
                            res.status(500);
                            res.json({error: err});
                        }
                        res.status(200);
                        res.json({result: result3});
                    });
                });
            }
        });
    })
    .post('/recipes/tools/:recipe_id', eJwt({secret: config.secret}), (req, res) => {
        if (!req.body.admin) return res.sendStatus(401);
        con.query(`SELECT id_tool FROM tools WHERE tool=?`, [sanitizer.sanitize(req.body.tool)], (err, result, fields) => {
            if (err) {
                res.status(500);
                res.json({error: err});
            }

            if (result.length != 0)
            {
                con.query(`INSERT INTO recipe_has_tools(tool_id, recipe_id)
                            VALUES (?, ?)`, [result.id_tool, sanitizer.sanitize(req.params.recipe_id)], (err, result2, fields) => {
                    res.status(200);
                    res.json({result: result2});
                });
            }
            else
            {
                con.query(`INSERT INTO tools(tool) VALUES (?)`, [sanitizer.sanitize(req.body.tool)], (err, result2, fields) => {
                    con.query(`INSERT INTO recipe_has_tools(tool_id, recipe_id)
                                VALUES (?, ?)`, [result2.insertId, sanitizer.sanitize(req.params.recipe_id)], (err, result3, fields) => {
                        if (err) {
                            res.status(500);
                            res.json({error: err});
                        }
                        res.status(200);
                        res.json({result: result3});
                    });
                });
            }
        });
    })
    .put('/recipe/:id', eJwt({secret: config.secret}), (req, res) => {
        if (!req.body.admin) return res.sendStatus(401);
        services.putRequest(req, res, con, "recipes", `id_recipe=${sanitizer.sanitize(req.params.id)}`);
    })
    .delete('/recipe/:id', eJwt({secret: config.secret}), (req, res) => {
        if (!req.body.admin) return res.sendStatus(401);
        services.deleteRequest(req, res, con, "recipes", `id_recipes=${sanitizer.sanitize(req.params.id)}`)
    })
    .delete('/recipes/:id/ingredients/:id_ingredient', eJwt({secret: config.secret}), (req, res) => {
        if (!req.body.admin) return res.sendStatus(401);
        services.deleteRequest(req, res, con, "recipe_has_ingredients", `recipe_id=${sanitizer.sanitize(req.params.id)} AND ingredient_id=${sanitizer.sanitize(req.params.id_ingredient)}`)
    })
    .delete('/recipes/:id/tools/:id_tool', eJwt({secret: config.secret}), (req, res) => {
        if (!req.body.admin) return res.sendStatus(401);
        services.deleteRequest(req, res, con, "recipe_has_tools", `recipe_id=${sanitizer.sanitize(req.params.id)} AND ingredient_id=${sanitizer.sanitize(req.params.id_tool)}`)
    });

}