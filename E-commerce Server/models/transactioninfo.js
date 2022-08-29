const mongoose = require('mongoose')

const userBankSchema = new mongoose.Schema({
        userName: {
            type: String,
        },
        accountId: {
            type: String,
            required: true,
        },
        secretkey: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
        orderID:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("UserTransactionInfo", userBankSchema);
