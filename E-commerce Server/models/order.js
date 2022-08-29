const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderID: {
        type: String,
        required: true,
    },
    product:[
        {
            productTitle: { type: String },
            quantity :{ type: Number },   
        }
    ],
    amount: {  type: Number, require: true },
    // address: { type: Object, required: true },
    status: {  type: String, default: "pending"}
},
{
    timestamps: true
}
);

module.exports = mongoose.model("OrderModel", orderSchema)