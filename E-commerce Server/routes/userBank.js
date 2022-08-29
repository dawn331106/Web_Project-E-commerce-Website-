const UserBank = require("../models/userbankinfo");
const router = require("express").Router();
const TransactionFeedBack = require('../models/transactionFeedbackModel')
const TransactionInfo = require('../models/transactioninfo')

/// REGISTER
router.post("/bankinfo", async (req, res) => {
  /// Validate the user for null userName, email, password
  const newUser = new UserBank({
    accountId: req.body.accountId,
    secretkey: req.body.secretkey,
  });

  try {
    const savedUser = await newUser.save();
    console.log(newUser);
    res.send(savedUser);
  } catch (err) {
    res.send(err);
  }
});


router.post('/orderList', async (req, res)=>{
    const transactionId = req.body.transactionId;
    const orderID = req.body.orderID;
    const accountId = req.body.accountId;

    const user = await TransactionInfo.findOne({ orderID: orderID })
    const userName = user.userName;
    console.log("Hiii", transactionId, orderID, accountId, userName);

    const orderDetails = new TransactionFeedBack({
        userName,
        transactionId,
        accountId,
        orderID
    })
    await orderDetails.save();
    res.send("paisi---->", orderDetails)
})

module.exports = router;
