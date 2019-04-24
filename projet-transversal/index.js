const express = require('express');
const bodyParser = require('body-parser');
const api = require('./models/requests');
const config = require('./config/config')
const eJwt = require('express-jwt');

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

app.post('/auth', (req, res) => {

    var email    = req.body.email,
        password = req.body.password;

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (re.test(String(email).toLowerCase()) && password.length >= 6)
    {
        api.connectUser(email, password).then((token) => {
        res.status(200);
        res.send(token);
        })
        .catch((err) => {
            res.status(404);
            res.send(err);
        });
    }
    else
    {
        res.status(400);
        res.send("Email or password incorrect")
    }
})
.post('/register', (req, res) => {
    postRequest(req, res, "users", "email, password");
})
.post('/order', eJwt({secret: config.secret}), (req, res) => {

    var user_id  = req.body.user_id,
        box_id   = req.body.box_id,
        adress   = req.body.adress,
        quantity = req.body.quantity;

    api.orderBox(user_id, box_id, adress, quantity).then((result) => {
        res.status(200);
        res.send(result);
    })
    .catch((err) => {
        res.status(404);
        res.send(err);
    });
})
.get('/products', (req, res) => {
    api.getRequest(req, res, "boxes", "*");
})
.post('/products', (req, res) => {
    api.postRequest(req, res, "boxes", "name, price, description");
})
.post('/feedback', (req, res) => {
    api.postRequest(req, res, "feedbacks", "content, user_id, box_id");
})
.get('/feedbacks/:box_id', (req, res) => {
    api.getRequest(req, res, "feedbacks", "*", `box_id=${req.params.box_id}`);
})
.post('/recipe', (req, res) => {
    api.postRequest(req, res, "recipes", "name, steps, preparation_time, cook_time, difficulty");
})
.get('/recipes/:id', (req, res) => {
    api.getRequest(req, res, "recipes", "*", `id_recipe=${req.params.id}`);
})
.post('/recipes/ingredients/:recipe_id', (req, res) => {
    api.addIngredientForRecipe(req.params.recipe_id, req.body.ingredient, req.body.quantity);
})
.post('/recipes/tools/:recipe_id', (req, res) => {
    api.addToolForRecipe(req.params.recipe_id, req.body.tool);
})
.get('/recipes/:recipe_id', (req, res) => {
    api.getIngredientsForRecipe(req.params.recipe_id);
})
.get('/recipes/:recipe_id', (req, res) => {
    api.getToolsForRecipe(req.params.recipe_id);
})
.put('/user/:id', (req, res) => {
    api.putRequest(req, res, "users", `id_user=${req.params.id}`);
})
.put('/products/:id', (req, res) => {
    api.putRequest(req, res, "boxes", `id_box=${req.params.id}`)
})
.put('/feedbacks/:id', (req, res) => {
    api.putRequest(req, res, "feedbacks", `id_feedback=${req.params.id}`)
})
.put('/recipe/:id', (req, res) => {
    api.putRequest(req, res, "recipes", `id_recipe=${req.params.id}`);
})
.delete('/user/:id', (req, res) => {
    api.deleteRequest(req, res, "users", `id_user=${req.params.id}`)
})
.delete('/order/:id', (req, res) => {
    api.deleteRequest(req, res, "orders", `id_order=${req.params.id}`)
})
.delete('/products/:id', (req, res) => {
    api.deleteRequest(req, res, "boxes", `id_box=${req.params.id}`)
})
.delete('/feedbacks/:id', (req, res) => {
    api.deleteRequest(req, res, "feedbacks", `id_feedback=${req.params.id}`)
})
.delete('/recipe/:id', (req, res) => {
    api.deleteRequest(req, res, "recipes", `id_recipes=${req.params.id}`)
})
.delete('/recipes/:id/ingredients/:id_ingredient', (req, res) => {
    api.deleteRequest(req, res, "recipe_has_ingredients", `recipe_id=${req.params.id} AND ingredient_id=${req.params.id_ingredient}`)
})
.delete('/recipes/:id/tools/:id_tool', (req, res) => {
    api.deleteRequest(req, res, "recipe_has_tools", `recipe_id=${req.params.id} AND ingredient_id=${req.params.id_tool}`)
})

var port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));