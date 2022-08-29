const Cart = require("../models/carts");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyTokden");
const router = require("express").Router();
const express = require("express");


// CREATE NEW CART
router.post('/add', verifyToken, async(req, res)=>{
    const newCArt = new Cart(req.body)
    console.log(newCArt);
    try {
        const cart = await newCArt.save();
        res.send(cart);
    } catch (err) {
        res.send(err);
    }
})


// UPDATE CART
router.put('/update/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try {
        const srchedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, 
        { new: true});
        // console.log("--->", srchedProduct);
        res.send(srchedCart);

    } catch (err) {
        res.send(err);
    }

})

// DELETE CART
router.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id)
        console.log(deletedCart);
        res.send("Cart deleted...!")
    } catch (error) {
        req.send(error);
    }
})

//GET USER CART
router.get('/find/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try {
        console.log("Ashce...")
        const srchedCart = await Cart.findOne({ userID: req.params.id })
        console.log("---->". srchedCart);
        res.send(srchedCart);
    } catch (err) {
        res.send(err);
    }    
})

// GET ALL CARTS
router.get('/', verifyTokenAndAdmin, async (req, res)=>{
    try {
        const carts = await Cart.find();
        res.send(carts);
    }catch (err) {
        res.send(err)
    }
})



module.exports = router;