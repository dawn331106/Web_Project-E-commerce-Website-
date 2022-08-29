const mongoose = require('mongoose');

const OrderHistorySchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    },
    orderID: {
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('OrderHistory', OrderHistorySchema);