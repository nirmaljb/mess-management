const { createOrder, verifyOrder, paymentDetails, getAllPayments, getUserPayments } = require("../controllers/paymentController");

const express = require("express");
const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-order', verifyOrder);
router.get('/payment-details', paymentDetails);
router.get('/get-all-payments', getAllPayments);
router.get('/get-user-payments', getUserPayments);

module.exports = router;