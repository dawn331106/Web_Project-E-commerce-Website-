const router = require('express').Router();
const OrderList = require('../models/orderList')

router.get('/', async (req, res)=>{
    const orders = await OrderList.find();
    res.render('allOrders', {
        orders : orders
    })
    // res.render('index.ejs')
})

// router.get('/orderList', async (req, res)=>{
//     const orders = await OrderList.find();
//     console.log(orders);
//     res.render('allOrders', {
//         orders : orders
//     })
// })

router.get('/orders/:transactionId', async (req, res)=>{
    const transactionId = req.params.transactionId;
    const productList = await OrderList.findOne({ transactionId });
    console.log(productList);
    res.render('orderDetails', {
        productList
    })
})


module.exports = router;