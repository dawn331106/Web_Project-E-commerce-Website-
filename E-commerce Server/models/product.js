const mongoose = require('mongoose')

// const productSchema = mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     desc:{
//         type: String,
//         required: true
//     },
//     img: {
//         type: String,
//         required: true
//     },
//     categories:{
//         type: Array
//     },
//     color: {
//         type: String,
//     },
//     size:{
//       type: String,  
//     }, 
//     price:{
//         type: Number,
//         required: true
//     }
// },
// {
//     timestamps: true
// }
// );

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("ProductModel", productSchema)