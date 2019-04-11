const express = require('express');
const bodyParser = require('body-parser');
const api = require('./models/requests');

const app = express();

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

api.getFromTable("*", "users", "id_user=2").then((result) => console.log(result))

var port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));