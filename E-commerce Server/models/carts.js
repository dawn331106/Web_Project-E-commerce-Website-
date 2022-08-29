const mongoose = require('mongoose')

// const cartSchema = mongoose.Schema({
//     userID: {
//         type: String,
//         required: true,
//     },
//     product:[
//         {
//             productID: { type: Number },
//             quantity :{ type: Number, default: 1},   
//         }
//     ]
// },
// {
//     timestamps: true
// }
// );

const cartSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("CartModel", cartSchema)