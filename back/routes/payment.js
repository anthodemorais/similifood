const eJwt = require('express-jwt');
const config = require('../config/config.js');
const stripe = require("stripe")("sk_test_6deM2jSE3xanwsBsGvgwHaTg"); // changer en live secret key en prod


exports.default = (app) => {

    app.post('/payment', eJwt({secret: config.secret}), (req, res) => {
        var price = parseInt(req.body.price);
        var token = req.body.tokenId;

        try {
            let {status} = stripe.charges.create({
              amount: price * 100,
              currency: "eur",
              description: "A simple charge",
              source: token
            });
        
            res.json({status});
          } catch (err) {
            res.status(500).end();
          }

        // var paymentCreation = new Promise((resolve, reject) =>
        // {
        //     console.log("creation");
        //     const intent = stripe.paymentIntents.create({
        //             amount: price * 100,
        //             currency: 'eur',
        //             payment_method_types: ['card'],
        //         });
        //     resolve(intent)
        // });

        // paymentCreation.then((intent) =>
        // {
        //     res.json({ client_secret: intent.client_secret });
        // });
    });

}

// quand on clique sur le bouton pour payer :

// var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// stripe.redirectToCheckout({
//   sessionId: '{{CHECKOUT_SESSION_ID}}',
// }).then(function (result) {
//   // If `redirectToCheckout` fails due to a browser or network
//   // error, display the localized error message to your customer
//   // using `result.error.message`.
// });