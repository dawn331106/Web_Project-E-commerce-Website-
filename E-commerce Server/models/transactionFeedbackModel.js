const mongoose = require('mongoose');

const TransactionFeedback = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    transactionId: {
        type: Number,
        required: true,
        default: 0
    },
    accountId: {
        type: Number,
        required: true
    },
    orderID:{
        type: Number,
        required: true
    }
},
{
    timestamps: true
}
)


module.exports = mongoose.model('TransactionFeedbackInfo', TransactionFeedback);
