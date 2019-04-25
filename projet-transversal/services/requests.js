const mysql = require('mysql');

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

    getFromTable: (con, values, table, where="") => {
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

    addIntoTable: (con, table, columns, values) => {
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

    deleteColumn: (con, table, where) => {
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

    updateColumn: (con, table, updates, where) => {
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

    postRequest: (req, res, con, table, columns) => {
    
        var values = [];
    
        for (key in req.body)
        {
            values.push(req.body[key]);
        }
    
        this.addIntoTable(con, table, columns, values).then((result) => {
            res.status(200);
            res.send(result);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
    },
    
    getRequest: (req, res, con, table, values, where="") => {
        return new Promise((resolve, reject) => {

            this.getFromTable(con, values, table, where).then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });

        });
    },

    putRequest: (req, res, con, table, where) => {

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
                    res.status(500);
                    res.send(err);
                    return
                }
                res.status(200);
                res.send(result);
                return
            });
        });
    },

    deleteRequest: (req, res, con, table, where) => {
        this.deleteColumn(con, table, where).then((result) => {
            res.status(200);
            res.send(result);
        })
        .catch((err) => {
            res.status(500);
            res.send(result);
        })
    }
}