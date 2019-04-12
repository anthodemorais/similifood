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

    var email = req.body.email
    var password = req.body.password

    api.connectUser(email, password).then((token) => {
        res.status(200);
        res.send(token)
    })
    .catch((err) => {
        res.status(404);
        res.send(err)
    });
})
.post('/register', (req, res) => {

    var email = req.body.email
    var password = req.body.password

    api.addIntoTable("users", "email, password", [email, password]).then((result) => {
        res.status(200);
        res.send(result)
    })
    .catch((err) => {
        res.status(404);
        res.send(err)
    });
})
.post('/order', (req, res) => {

    var user_id  = req.body.user_id,
        box_id   = req.body.box_id,
        adress   = req.body.adress,
        quantity = req.body.quantity

    api.orderBox(user_id, box_id, adress, quantity).then((result) => {
        res.status(200);
        res.send(result)
    })
    .catch((err) => {
        res.status(404);
        res.send(err)
    });
})
.get('/products', (req, res) => {
    api.getFromTable("*", "boxes").then((result) => {
        res.status(200);
        res.send(result)
    })
    .catch((err) => {
        res.status(404);
        res.send(err)
    });
})
.post('/products', (req, res) => {
    
    var name        = req.body.name,
        price       = req.body.price,
        description = req.body.description

    api.addIntoTable("boxes", "name, price, description", [name, price, description]).then((result) => {
        res.status(200);
        res.send(result)
    })
    .catch((err) => {
        res.status(404);
        res.send(err)
    });
})

var port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));