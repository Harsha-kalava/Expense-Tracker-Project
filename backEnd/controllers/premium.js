const Order = require("../models/orders");
const Razorpay = require("razorpay");

const purchasepremium =async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                console.log(err)
            }
            console.log("order.id",order.id)
            console.log(req.user,'user')
            req.user.createOrder({ orderId: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}

 const updateTransactionStatus = async (req, res ) => {
    try {
        const {payment_id, order_id} = req.body;
        const order = Order.findOne({where : {orderid : order_id}})
        const promise1 = order.update({ paymentId: payment_id, status: 'SUCCESSFUL'})
        const promise2 = req.user.update({ispremium: true})

        Promise.all[promise1,promise2].then(()=>{
            return res.status(202).json({sucess: true, message: "Transaction Successful"});
        }).catch((error)=>{
            throw new Error(error)
        })         
        }
    catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}