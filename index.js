const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6011;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require("dotenv").config();


// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// MongoDB Configuration
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-clustor.xjk0h.mongodb.net/demo-foodi-client?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));



//jwt authentication
app.post('/jwt', async(req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1hr'
  })
  res.send({token});
})








// Import routes
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");

// Use routes
app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);








// stripe payment routes

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price*100;


  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",

    payment_method_types: ["card"]
    
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
});


app.listen(4242, () => console.log("Node server listening on port 4242!"));










// Base route
app.get("/", (req, res) => {
  res.send("Hello Foodi Client Server!");
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
