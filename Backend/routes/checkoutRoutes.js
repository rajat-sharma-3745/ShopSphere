const express = require('express');
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

// There will be 3 checkout routes: 
// 1.Create a checkout session
// 2.Pay route to mark the checkout as paid
// 3.Finalizing the checkout and convert it to a complete order


// Post: Create a new checkout session
router.post('/', protect, async (req, res) => {
    const { checkoutItems, shippingInfo, paymentMethod, totalPrice } = req.body;
    // Check check out items 
    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: 'No items for checkout' });
    }
    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingInfo,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        })
        console.log(`checkout created for user: ${req.user._id}`)
        res.status(201).json(newCheckout)
    } catch (error) {
        console.error("Error creating checkout session ", error)
        res.status(500).json({ message: "Server error" })
    }
})

// Put: Update checkout to mark as paid after successful payment
router.put('/:id/pay', protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body
    try {
        const checkout = await Checkout.findById(req.params.id)
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" })
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout)
        } else {
            res.status(400).json({ message: "Invalid payment status" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

// Post: Finalize checkout after payment confirmation
router.post('/:id/finalize', protect, async (req, res) => {

    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" })
        }
        if (checkout.isPaid && !checkout.isFinalized) {
            //   create final order
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingInfo: checkout.shippingInfo,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            })
            // Mark checkout as finalized to prevent duplicate orders
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();

            await checkout.save();
            // Delete the user cart after order is finalized
            await Cart.findOneAndDelete({ user: checkout.user })
            res.status(201).json(finalOrder)
        }
        else if(checkout.isFinalized){
            // checkout is already finalized
            res.status(400).json({ message: "Checkout already finalized" });
        }
        else{
            res.status(400).json({ message: "Checkout is not paid" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})


module.exports = router;