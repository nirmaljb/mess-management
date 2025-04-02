const { PrismaClient } = require("@prisma/client");
const RazorPay = require("razorpay");
const crypto = require("crypto");

const prisma = new PrismaClient();

const razorpayInfo = {
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
};

const razorpay = new RazorPay(razorpayInfo);

const now = new Date();
const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

const createOrder = async (req, res) => {
    const { enrollment_no, amount } = req.body;

    const options = {
        amount: amount * 100,
        payment_capture: 1
    };

    try {
        const order = await razorpay.orders.create(options);
        console.log(order);
        const store = await prisma.payment.create({
            data: {
                unique_id: order.id,
                amount: order.amount / 100,
                enrollment_no: enrollment_no,
                payment_time: formattedTime,
                payment_status: "failed"
            }
        });

        console.log(store);

        res.json({ success: true, store, order });
    }catch (error) {
        return res.status(500).json({ success: false, error: error });
      }
};

const verifyOrder = async(req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

        if (expectedSignature === razorpay_signature) {
            const payment = await prisma.payment.update({
                where: {
                    unique_id: razorpay_order_id
                },
                data: {
                    payment_status: "completed",
                    transaction_id: razorpay_payment_id
                }
            });

            res.json({ 
                success: true, 
                message: "Payment verified successfully",
                payment
            });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" }, 400);
        }
    }catch(error) {
        res.status(500).json({ success: false, error: error });
  }
};

const paymentDetails = async (req, res) => {
    try {
        const { payment_id } = req.body;

        // Fetch payment details from Razorpay API
        const payment = await razorpay.payments.fetch(payment_id);

        res.json({ success: true, payment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            include: {
                user: {
                    select: {
                        fullname: true,
                        email: true,
                        enrollment_no: true,
                        course: true,
                        department: true,
                        hostel_name: true,
                        room_no: true
                    }
                }
            }
        });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getIncompletePayment = async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            where: {
                payment_status: {
                    in: ["failed", "pending"]
                }
            }
        });
        res.json(payments);
    }catch(err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

const getCompletePayment = async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            where: {
                payment_status: "completed"
            }
        });
        res.json(payments);
    }catch(err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

const getUserPayments = async (req, res) => {
    const { id } = req.query;
    console.log(id);
    try {
        const payments = await prisma.user.findUnique({
            where: {
                enrollment_no: id
            },
            include: {
                payment: {
                    select: {
                        amount: true,
                        payment_status: true,
                        transaction_id: true,
                        payment_time: true,
                        created_at: true,
                    }
                }
            }
        });

        res.json(payments);
    }catch(err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
}


module.exports = {
    createOrder,
    verifyOrder,
    paymentDetails,
    getAllPayments,
    getUserPayments,
    getIncompletePayment,
    getCompletePayment
}