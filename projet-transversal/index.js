const express = require('express');
const bodyParser = require('body-parser');
const api = require('./models/requests');
const config = require('./config/config')
const eJwt = require('express-jwt');
const mysql = require('mysql');

  // Host	localhost
  // Port	8889
  // User	root
  // Password	root
  // Socket	/Applications/MAMP/tmp/mysql/mysql.sock
  
const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      port: "8889",
      database: "projetTransversal"
});

const app = express();

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

require('./routes/user')(app, con);
require('./routes/order')(app, con);
require('./routes/product')(app, con);
require('./routes/recipe')(app, con);
require('./routes/feedback')(app, con);

var port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));