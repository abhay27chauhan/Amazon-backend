const express = require("express");
const cors = require("cors");

const stripe = require('stripe')("sk_test_51Hk4Y1IQ8MiZInN8AZWqvp1r7eGTf2RQHOvAb1hAI7Uh0FsHaJ9378vWNgzgB3RVqyuttW38XA6ZWagjGDZqqWB400oEWVGwEu");

// - App config
const app = express();
const port = process.env.PORT || 5000;

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get('/', (req, res) => res.status(200).send("Hello Word!!"));

app.post("/payments/create", async (request, response) => {
  const total = request.body.basketTotal;
  console.log(request.body);
  
  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  
  const paymentIntent = await stripe.paymentIntents.create({
    description: 'Items Purchased',
    shipping: {
      name: 'Abhay Chauhan',
      address: {
        line1: 'MAIT',
        postal_code: '110086',
        city: 'Delhi',
        state: 'Delhi',
        country: 'IN',
      },
    },
    amount: total,
    currency: 'inr',
    payment_method_types: ['card']
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
app.listen(port, error=> {
  if (error) throw error;
  console.log('Server running on port ' + port);
});
