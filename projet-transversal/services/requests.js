const passwordHash = require("password-hash");
const sanitizer = require('sanitizer');

class Services {

    getFromTable(con, values, table, where="") {
        return new Promise((resolve, reject) => {
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
    }

    addIntoTable(con, table, columns, values) {
        return new Promise((resolve, reject) => {
            if (table == "users")
            {
                values[1] = passwordHash.generate(values[1]);
            }

            let query = `INSERT INTO ${table}(`;

            for(var key in columns) {
                query += columns[key];
            }

            query += `) VALUES(?)`
            
            con.query(query, [values], (err, result, fields) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    deleteColumn(con, table, where) {
        return new Promise((resolve, reject) => {
            let query = `DELETE FROM ${table} WHERE ${where}`;
            con.query(query, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    updateColumn(con, table, updates, where) {
        return new Promise((resolve, reject) => {
            var query = `UPDATE ? SET ? WHERE ?`;
            con.query(query, [table, updates, where], function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    postRequest(req, res, con, table, columns) {
    
        var values = [];
    
        for (var key in req.body)
        {
            values.push(sanitizer.sanitize(req.body[key]));
        }
    
        this.addIntoTable(con, table, columns, values).then((result) => {
            res.status(200);
            res.send(result);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
    }
    
    getRequest(req, res, con, table, values, where="") {
        return new Promise((resolve, reject) => {

            this.getFromTable(con, values, table, where).then((result) => {
                res.status(200);
                res.send(result);
            })
            .catch((err) => {
                res.status(500);
                res.send(err);
            });

        });
    }

    putRequest(req, res, con, table, where) {

        var updates = [];
        for (var key in req.body)
        {
            if (key == "password")
            {
                var password = passwordHash.generate(sanitizer.sanitize(req.body[key]));
                updates.push(key + "='" + password + "'")
            }
            else
            {
                updates.push(key + "='" + sanitizer.sanitize(req.body[key]) + "'")
            }
        }
        var update = updates.join(", ");

        var query = `UPDATE ${table} SET ${update} WHERE ${where}`;
        con.query(query, (err, result) => {
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
    }

    deleteRequest(req, res, con, table, where) {
        this.deleteColumn(con, table, where).then((result) => {
            res.status(200);
            res.send(result);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        })
    }
}

module.exports = new Services();