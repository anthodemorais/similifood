const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const config = require('./config/config.js');

const con = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "root",
      port: "8889",
      database: "projetTransversal"
});

const app = express();

// app.use(express.cookieParser());

app.set('trust proxy', 1);
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

require('./routes/user').default(app, con);
require('./routes/order').default(app, con);
require('./routes/product').default(app, con);
require('./routes/recipe').default(app, con);
require('./routes/feedback').default(app, con);
require('./routes/payment').default(app);

const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));