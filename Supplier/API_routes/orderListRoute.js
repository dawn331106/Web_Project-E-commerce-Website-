const router = require('express').Router();
const orderListSchema = require('../models/orderList')

router.post('/add', async (req, res)=>{
    const transactionId = req.body.transactionId;
    const products = req.body.orderList;
    const amount = req.body.amount;
    // console.log(transactionId, products, amount);

    const orderList = new orderListSchema({
        transactionId,
        orderList: products,
        amount
    })

    const list = await orderList.save();
    console.log(list);
})

module.exports = router;