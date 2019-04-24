// getUsers() -> [{id, firstname, lastname, email}, ...]
// getUserById(id) -> {firstname, lastname, email}
// userExists(email, password) -> Bool
// connectUser(email, password)
// addUser(email, password) -> ()
// orderBox(id, user_id, adress, number, date)

// getBoxes() -> [{id, name, price, description}, ...]
// addBox(name, price, description) -> ()
// addFeedback(box_id, content, user_id)
// getFeedbacks(box_id) -> [[content, user_id], [content2, user_id], ...]
// addRecipe(name, steps, preparation, cook, difficulty) -> ()
// getRecipes() -> [{id, name, steps, preparation, cook, difficulty}, ...]
// getRecipeById(id) -> [{id, name, steps, preparation, cook, difficulty}, ...]
// addIngredientForRecipe(recipe_id, ingredient)
// getIngredientsForRecipe(id) -> [ingredient, ...]
// addToolForRecipe(recipe_id, tool)
// getToolsForRecipe(id) -> [tool, ...]
// getIngredientId(ingredient) -> (id)
// getToolId(tool) -> (id)

// addIngredient(ingredient) -> ()
// getIngredient(id) -> (ingredient)
// addTool(tool) -> ()
// getTool(id) -> (tool)
// updateUser(id, newMail, newPassword) -> ()
// updateBox(id, newName, newPrice, newDescription) -> ()
// updateFeedback(id, box_id, content, user_id)
// updateRecipe(id, name, steps, preparation, cook, difficulty) -> ()
// deleteUser(id)
// deleteOrder(id)
// deleteBox(id)
// deleteFeedback(id)
// deleteRecipe(id)
// deleteIngredientForRecipe(recipe_id, ingredient_id)
// deleteToolForRecipe(recipe_id, tool_id)

const mysql = require('mysql');
const passwordHash = require("password-hash");
const jwt = require('jwt-simple');
const config = require('../config/config.js');

  // Host	localhost
  // Port	8889
  // User	root
  // Password	root
  // Socket	/Applications/MAMP/tmp/mysql/mysql.sock
  
var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      port: "8889",
      database: "projetTransversal"
});

module.exports = {

    connectUser: (email, password) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`SELECT * FROM users WHERE email=?`, [email], (err, result, fields) => {
                    if (err) reject(err);

                    if (result.length != 0)
                    {
                        if (!passwordHash.verify(password, result[0].password))
                        {
                            reject("Email or password incorrect");
                        }
                        let token = jwt.encode(this, config.secret);
                        resolve(token);
                    }
                    else
                    {
                        reject("Email or password incorrect");
                    }
                });
            });
        });
    },

    orderBox: (user_id, box_id, adress, quantity) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);

                var date_of_order = new Date();
                var dd = String(date_of_order.getDate()).padStart(2, '0');
                var mm = String(date_of_order.getMonth() + 1).padStart(2, '0');
                var yyyy = date_of_order.getFullYear();
                date_of_order = dd + '/' + mm + '/' + yyyy;

                var query = `INSERT INTO orders (status, user_id, box_id, adress, date_of_order, quantity)
                            VALUES ('ordered', ?, ?, ?, str_to_date(?, '%d/%m/%Y'), ?)`
                con.query(query, [user_id, box_id, adress, date_of_order, quantity], (err, result, fields) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        });
    },

    addIngredientForRecipe: (recipe_id, ingredient, quantity) => {

        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`SELECT id_ingredient FROM ingredients WHERE ingredient=?`, [ingredient], (err, result, fields) => {
                    if (err) reject(err);

                    if (result.length != 0)
                    {
                        con.query(`INSERT INTO recipe_has_ingredients(ingredient_id, recipe_id, quantity)
                                    VALUES (?, ?, ?)`, [result.id_ingredient, recipe_id, quantity], (err, result, fields) => {

                            if (err) reject(err);
                            resolve(result);
                        });
                    }
                    else
                    {
                        this.addIntoTable("ingredients", "ingredient", [ingredient]).then((result2) => {
                            con.query(`INSERT INTO recipe_has_ingredients(ingredient_id, recipe_id, quantity)
                                        VALUES (?, ?, ?)`, [result2.insertId, recipe_id, quantity], (err, result3, fields) => {

                                if (err) reject(err);                                
                                resolve(result3);
                            });
                        });
                    }
                });
            });
        });
    },

    getIngredientsForRecipe: (id) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`SELECT ingredient FROM ingredients AS i
                            INNER JOIN recipe_has_ingredients AS rhi
                            ON i.id_ingredient = rhi.ingredient_id
                            WHERE rhi.recipe_id = ?`, [id], (err, result, fields) => {
                                
                    if (err) reject(err);
                    resolve(result);
                })
            })
        })
    },

    addToolForRecipe: (recipe_id, tool) => {

        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`SELECT id_tool FROM tools WHERE tool=?`, [tool], (err, result, fields) => {
                    if (err) reject(err);

                    if (result.length != 0)
                    {
                        con.query(`INSERT INTO recipe_has_tools(tool_id, recipe_id)
                                    VALUES (?, ?)`, [result.id_tool, recipe_id], (err, result, fields) => {
                            resolve(result);
                        });
                    }
                    else
                    {
                        reject("Tool doesn't exist");
                    }
                });
            });
        });
    },

    getToolsForRecipe: (id) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`SELECT tool FROM tools AS t
                            INNER JOIN recipe_has_tools AS rht
                            ON t.id_tool = rht.tool_id
                            WHERE rht.recipe_id = ?`, [id], (err, result, fields) => {
                    if (err) reject(err);
                    resolve(result);
                })
            })
        })
    },

    getFromTable: (values, table, where="") => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);

                if (where !== "")
                {
                    con.query(`SELECT ? FROM ? WHERE ?`, [values, table, where], (err, result, fields) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                }
                else
                {
                    con.query(`SELECT ? FROM ?`, [values, table], (err, result, fields) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                }
                
            });
        });
    },

    addIntoTable: (table, columns, values) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);

                if (table == "users")
                {
                    values[1] = passwordHash.generate(values[1]);
                }

                let query = `INSERT INTO ?(?) VALUES (?)`;
                
                con.query(query, [table, columns, values], (err, result, fields) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        });
    },

    deleteColumn: (table, where) => {
        return new Promise((resolve, reject) => {
            con.connect(function(err) {
                if (err) reject(err);

                let query = `DELETE FROM ? WHERE ?`;
                con.query(query, [table, where], function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        })
    },

    updateColumn: (table, updates, where) => {
        return new Promise((resolve, reject) => {
            con.connect(function(err) {
                if (err) reject(err);

                var query = `UPDATE ? SET ? WHERE ?`;
                con.query(query, [table, updates, where], function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        })
    },

    postRequest: (req, res, table, columns) => {
    
        var values = [];
    
        for (key in req.body)
        {
            values.push(req.body[key]);
        }
    
        this.addIntoTable(table, columns, values).then((result) => {
            res.status(200);
            res.send(result);
        })
        .catch((err) => {
            res.status(404);
            res.send(err);
        });
    },
    
    getRequest: (req, res, table, values, where="") => {
        this.getFromTable(values, table, where).then((result) => {
            res.status(200);
            res.send(result);
        })
        .catch((err) => {
            res.status(404);
            res.send(err);
        });
    },

    putRequest: (req, res, table, where) => {

        var updates = [];
        for (var key in req.body)
        {
            if (key == "password")
            {
                var password = passwordHash.generate(req.body[key]);
                updates.push(key + "='" + password + "'")
            }
            else
            {
                updates.push(key + "='" + req.body[key] + "'")
            }
        }
        var update = updates.join(", ");

        con.connect((err) => {
            if (err)
            {
                res.status(500);
                res.send(err);
                return
            }

            var query = `UPDATE ? SET ? WHERE ?`;
            con.query(query, [table, update, where], (err, result) => {
                if (err)
                {
                    res.status(404);
                    res.send(err);
                    return
                }
                res.status(200);
                res.send(result);
                return
            });
        });
    },

    deleteRequest: (req, res, table, where) => {
        this.deleteColumn(table, where).then((result) => {
            res.status(200);
            res.send(result);
        })
        .catch((err) => {
            res.status(404);
            res.send(result);
        })
    }
}