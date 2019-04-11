const express = require('express');
const bodyParser = require('body-parser');
const api = require('./models/requests');

const app = express();

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

app.post('/auth', (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    api.connectUser(email, password).then((token) => {
        res.status(200);
        res.send(token)
    })
    .catch((err) => {
        res.status(404);
        res.send(err)
    });
})

var port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));