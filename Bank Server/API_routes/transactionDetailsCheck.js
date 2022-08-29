const router = require("express").Router();
const Users = require("../models/userModel");
const allTransactions = require("../models/userTransactionModel");
const CryptoJS = require("crypto-js");

router.post("/verifyAccAndTransaction", async (req, res) => {
  const accountId = req.body.accountId;
  const secretkey = req.body.secretkey;
  const amount = req.body.amount;
  const orderID = req.body.orderID;
  const recAccId = req.body.recAccId;
  //const recSeckey = req.body.recSecKey;

  console.log(accountId, secretkey, amount, "--", orderID);
  console.log(recAccId, req.body.recSecKey, amount, "--", orderID);


  const existingUser = await Users.findOne({ accountId });
  const recUser = await Users.findOne({ accountId: recAccId });
  console.log(recUser);
  // const userAccBalance = existingUser.amount;
  if (!existingUser) {
    res.send("No such User exists !");
  } else {
    // const decryptedHashPassword = CryptoJS.AES.decrypt(
    //   existingUser.secretkey,
    //   process.env.PASS_SEC_KEY
    // ).toString(CryptoJS.enc.Utf8);
    // console.log(existingUser.accountId, decryptedHashPassword, existingUser.amount);
    const userAccBalance = existingUser.amount;

    if (amount > userAccBalance) {
      res.send("Insufficient balance for this transaction...!");
    } else {
      const updatedBalance = userAccBalance - amount;
      const srchedUserAcc = await Users.findOne({ accountId });
      const updatedAccount = await Users.updateOne(
        srchedUserAcc,
        {
          $set: { amount: updatedBalance },
        },
        { new: true }
      );
      const recAccBalance = recUser.amount;
      console.log("Receiver Balance : ",recAccBalance);
      const recBalanceUpdate = recAccBalance + amount;
      console.log("New Balance ", recBalanceUpdate);
      const updateRecAcc = await Users.updateOne(
        recUser,
        {
          $set: { amount: recBalanceUpdate},
        },
        { new: true}
      );
      res.send("Transaction successfull...!");

      const transactionId = new Date().getTime()
      const userTransactionDetails = new allTransactions({
        accountId: srchedUserAcc.accountId,
        amount: amount,
        transactionId: transactionId,
        orderID
      });
      //console.log(userTransactionDetails);

      try {
        const newTransaction = await userTransactionDetails.save();
        // console.log("-------->" , newTransaction);
      } catch (err) {
        console.log(err);
      }
    }
  }
});


// router.post("/verifyAccAndTransaction", async (req, res) => {
//   const accountId = req.body.accountId;
//   const secretkey = req.body.secretkey;
//   const amount = req.body.amount;

//   console.log(accountId, secretkey, amount);

//   const existingUser = await Users.findOne({ accountId });
//   // const userAccBalance = existingUser.amount;
//   if (!existingUser) {
//     res.send("No such User exists !");
//   } else {
//     const decryptedHashPassword = CryptoJS.AES.decrypt(
//       existingUser.secretkey,
//       process.env.PASS_SEC_KEY
//     ).toString(CryptoJS.enc.Utf8);
//     // console.log(existingUser.accountId, decryptedHashPassword, existingUser.amount);
//     const userAccBalance = existingUser.amount;

//     if (
//       existingUser.accountId != accountId ||
//       decryptedHashPassword != secretkey
//     ) {
//       res.send("Your Account Number or Secret key is invalid...!");
//     } else if (amount > userAccBalance) {
//       res.send("Insufficient balance for this transaction...!");
//     } else {
//       const updatedBalance = userAccBalance - amount;
//       const srchedUserAcc = await Users.findOne({ accountId });
//       const updatedAccount = await Users.updateOne(
//         srchedUserAcc,
//         {
//           $set: { amount: updatedBalance },
//         },
//         { new: true }
//       );
//       res.send("Transaction successfull...!");

//       const userTransactionDetails = new allTransactions({
//         accountId: srchedUserAcc.accountId,
//         amount: amount,
//         transactionId: new Date().getTime(),
//       });
//       console.log(userTransactionDetails);

//       try {
//         const newTransaction = await userTransactionDetails.save();
//         // console.log("-------->" , newTransaction);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }
// });

router.get("/allTransactions", async (req, res) => {
  console.log("a");
});

router.get("/userTransactions", async (req, res) => {
  try {
    // console.log("asiii");
    // const accountId = req.body.accountId;
    // console.log(accountId, "ashce");
    await allTransactions.find({}, (err, docs) => {
      if (err) res.send(err);

      res.send(docs);
      console.log("gese...")
      // console.log("--->", docs);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
