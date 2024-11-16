const express = require("express");
const Payment = require("../models/Payment");
const mongoose = require("mongoose");
const router = express.Router();
const Carts = require("../models/Carts");
const ObjectId = mongoose.Types.ObjectId;

const verifyToken = require('../middleware/verifyToken');

// Post payment information to the database
router.post('/', verifyToken, async (req, res) => {
    const payment = req.body;
    try {
        // Save payment information to the database
        const paymentRequest = await Payment.create(payment);

        // Delete cart items after successful payment
        const cartIds = payment.cartItems.map(id => new ObjectId(id));
        const deleteCartRequest = await Carts.deleteMany({ _id: { $in: cartIds } });

        // Send a single consolidated response
        res.status(200).json({ paymentRequest, deleteCartRequest });
    } catch (error) {
        // Handle errors and respond with an appropriate status code
        console.error("Error processing payment:", error.message);
        res.status(500).json({ message: error.message });
    }
});

//get payment information
router.get('/', verifyToken, async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    try {
        const decodedEmail = req.decoded.email;
        if (email !== decodedEmail) {
            res.status(403).json({message: "Forbiden Access"})
        }
        const result = await Payment.find(query).sort({createdAt: -1}).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
