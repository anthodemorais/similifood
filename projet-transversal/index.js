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

    var email    = req.body.email,
        password = req.body.password;

    api.connectUser(email, password).then((token) => {
        res.status(200);
        res.send(token);
    })
    .catch((err) => {
        res.status(404);
        res.send(err);
    });
})
.post('/register', (req, res) => {
    postRequest(req, res, "users", "email, password");
})
.post('/order', (req, res) => {

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
    api.addIngredientForRecipe(req.params.recipe_id, req.body.ingredient);
})
.post('/recipes/tools/:recipe_id', (req, res) => {
    api.addIngredientForRecipe(req.params.recipe_id, req.body.tool);
})
.get('/recipes/:recipe_id', (req, res) => {
    api.getIngredientsForRecipe(req.params.recipe_id);
})
.get('/recipes/:recipe_id', (req, res) => {
    api.getToolsForRecipe(req.params.recipe_id);
})
.put('/')

var port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));