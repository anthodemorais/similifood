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
// updateIngredientForRecipe(recipe_id, ingredient_id)
// updateToolForRecipe(recipe_id, tool_id)
// deleteUser(id)
// deleteOrder(id)
// deleteBox(id)
// deleteFeedback(id)
// deleteRecipe(id)
// deleteIngredientForRecipe(recipe_id, ingredient_id)
// deleteToolForRecipe(recipe_id, tool_id)

// refactor les select et les insert

const mysql = require('mysql');
const passwordHash = require("password-hash");
const randtoken = require('rand-token');

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
                con.query(`SELECT * FROM users WHERE email='${email}'`, (err, result, fields) => {
                    if (err) reject(err);
                    
                    if (result.length != 0)
                    {
                        if (!passwordHash.verify(password, result[0].password))
                        {
                            reject("Invalid password");
                        }
                        let token = randtoken.generate(45);
                        con.query(`INSERT INTO tokens(token) VALUES('${token}')`, (err, result, fields) => {
                            resolve(token);
                        });
                    }
                    else
                    {
                        reject("Email does not exist");
                    }
                });
            });
        });
    },

    // addUser: (email, password) => {
    //     password = passwordHash.generate(password);

    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query(`INSERT INTO users (email, password) VALUES ('${email}', '${password}')`, (err, result, fields) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //     });
    // },

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
                            VALUES ('ordered', '${user_id}', '${box_id}', '${adress}', str_to_date('${date_of_order}', '%d/%m/%Y'), ${quantity})`
                con.query(query, (err, result, fields) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        });
    },

    // getBoxes: () => {
    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query("SELECT * FROM boxes", (err, result, fields) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //     });
    // },

    // addBox: (name, price, description) => {
    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query(`INSERT INTO boxes (name, price, description)
    //                         VALUES ('${name}', ${price}, '${description}')`, (err, result, fields) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //     });
    // },

    // addFeedback: (box_id, content, user_id) => {
    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query(`INSERT INTO feedbacks (content, user_id, box_id)
    //                         VALUES ('${content}', ${user_id}, '${box_id}')`, (err, result, fields) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //     });
    // },

    // getFeedbacks: (box_id) => {
    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query(`SELECT * FROM feedbacks WHERE box_id=${box_id}`, (err, result, fields) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //     });
    // },

    // addRecipe: (name, steps, preparation, cook, difficulty) => {
    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query(`INSERT INTO recipes (name, steps, preparation_time, cook_time, difficulty)
    //                         VALUES ('${name}', ${steps}, '${preparation}', '${cook}', ${difficulty})`, (err, result, fields) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //     });
    // },

    // getRecipes: () => {
    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query(`SELECT * FROM recipes`, (err, result, fields) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //     });
    // },

    // getRecipeById: (id) => {
    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query(`SELECT * FROM feedbacks WHERE id_recipe=${id}`, (err, result, fields) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //     });
    // },

    // getIngredientId: (ingredient) => {
    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query(`SELECT id_ingredient FROM ingredients WHERE ingredient=${ingredient}`, (err, result, fields) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //     });
    // },

    // getToolId: (tool) => {
    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query(`SELECT id_tool FROM tools WHERE tool=${tool}`, (err, result, fields) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //     });
    // },

    // addIngredientForRecipe: (recipe_id, ingredient_id) => {
    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query(`INSERT INTO recipe_has_ingredients(ingredient_id, recipe_id)
    //                         VALUES (${ingredient_id}, ${recipe_id})`, (err, result, fields) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //     });
    // },

    getIngredientsForRecipe: (id) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`SELECT ingredient FROM ingredients AS i
                            INNER JOIN recipe_has_ingredients AS rhi
                            ON i.id_ingredient = rhi.ingredient_id
                            WHERE rhi.recipe_id = ${id}`, (err, result, fields) => {
                    if (err) reject(err);
                    resolve(result);
                })
            })
        })
    },

    // addToolForRecipe: (recipe_id, tool_id) => {
    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query(`INSERT INTO recipe_has_tools(tool_id, recipe_id)
    //                         VALUES (${tool_id}, ${recipe_id})`, (err, result, fields) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //     });
    // },

    getToolsForRecipe: (id) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`SELECT tool FROM tools AS t
                            INNER JOIN recipe_has_tools AS rht
                            ON t.id_tool = rht.tool_id
                            WHERE rht.recipe_id = ${id}`, (err, result, fields) => {
                    if (err) reject(err);
                    resolve(result);
                })
            })
        })
    },

    getFromTable: (values, table, where) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);

                if (where !== "")
                {
                    con.query(`SELECT ${values} FROM ${table} WHERE ${where}`, (err, result, fields) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                }
                else
                {
                    con.query(`SELECT ${values} FROM ${table}`, (err, result, fields) => {
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

                let columnsJoined = columns.join(", ")
                let query = `INSERT INTO ${table}(${columnsJoined}) VALUES (?)`;
                
                con.query(query, [values], (err, result, fields) => {
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

                let query = `DELETE FROM ${table} WHERE ${where}`;
                con.query(query, function (err, result) {
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

                var query = `UPDATE ${table} SET ${updates} WHERE ${where}`;
                con.query(query, function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        })
    }
}