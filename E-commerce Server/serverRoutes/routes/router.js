const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const UserBank = require('../../models/userbankinfo');
const axios = require('axios');

//////////////////////////////////////

// TransactionInfo
const TransactionInfo = require('../../models/transactioninfo');

//////////////////////////////////

// CartProducts
const CartProducts = require('../../models/carts');

///////////////////////////////////

// Products
const shopProduct = require('../../models/product');

// Orders
const Orders = require('../../models/order')

// TransactionFeedBack 
const TransactionFeedBack = require('../../models/transactionFeedbackModel') 

// Order History based on OrderID
const OrderHistory = require('../../models/orderHistory')



//////////////////////////////////
router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/register', (req, res)=>{
    res.render('register');
})

router.get('/login', (req,res)=>{
    res.render('login');
})

// router.get('/home', (req, res)=>{
//     res.render('user_home')
// })


// router.post('/register', async (req, res)=>{
//     /// Validate the user for null userName, email, password   
//     const newUser = new User({
//         userName : req.body.userName,
//         email: req.body.email,
//         password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString()
//     })

//     try {
//         const savedUser = await newUser.save();
//         // console.log(savedUser);
//         res.redirect('/');
//     }catch (err) {
//         res.send(err);
//     }
// });
router.post('/register', async (req, res)=>{
    /// Validate the user for null userName, email, password   
    const newUser = new User({
        userName : req.body.userName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString()
    })

    try {
        const savedUser = await newUser.save();
        const newDummyUser = new TransactionInfo({
            userName : 'dummy',
            accountId : 'accdummy',
            secretkey : 'seckey',
            amount : 12
        })
        const blazer1 = await shopProduct.findOne({ title: "BLAZER1"})
        const blazer2 = await shopProduct.findOne({ title: "BLAZER2"})
        const blazer3 = await shopProduct.findOne({ title: "BLAZER3"})
        const pant1 = await shopProduct.findOne({ title: "PANT1"})
        const pant2 = await shopProduct.findOne({ title: "PANT2"})
        const pant3 = await shopProduct.findOne({ title: "PANT3"})
        const shoe1 = await shopProduct.findOne({ title: "SHOE1"})
        const shoe2 = await shopProduct.findOne({ title: "SHOE2"})
        const shoe3 = await shopProduct.findOne({ title: "SHOE3"})

        res.render('user_home',{details: savedUser,bankdetails: newDummyUser,blazerData1: blazer1,blazerData2: blazer2,blazerData3: blazer3,
            pantData1: pant1,pantData2: pant2,pantData3: pant3,shoeData1: shoe1,shoeData2: shoe2,shoeData3: shoe3});

        // console.log(savedUser);
       // res.redirect('/');
    }catch (err) {
        res.send(err);
    }
});


router.post('/home', async (req, res)=>{
    console.log("achce......")
    try {
        const user = await User.findOne({ userName: req.body.userName })
        
        const bankinfo = await UserBank.findOne({ userName: req.body.userName })
        // console.log(user, bankinfo)
        const newUser = new TransactionInfo({
            userName : 'dummy',
            accountId : 'accdummy',
            secretkey : 'seckey',
            amount : 12
        })
        const blazer1 = await shopProduct.findOne({ title: "BLAZER1"})
        const blazer2 = await shopProduct.findOne({ title: "BLAZER2"})
        const blazer3 = await shopProduct.findOne({ title: "BLAZER3"})
        const pant1 = await shopProduct.findOne({ title: "PANT1"})
        const pant2 = await shopProduct.findOne({ title: "PANT2"})
        const pant3 = await shopProduct.findOne({ title: "PANT3"})
        const shoe1 = await shopProduct.findOne({ title: "SHOE1"})
        const shoe2 = await shopProduct.findOne({ title: "SHOE2"})
        const shoe3 = await shopProduct.findOne({ title: "SHOE3"})
        if(!user) res.send("Wrong Identity...!")

        const decrpted_Hash_Password = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC_KEY);
        const originalPassword = decrpted_Hash_Password.toString(CryptoJS.enc.Utf8);
        
        if(originalPassword != req.body.password) res.send("Your username or password is incorrect !")

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC_KEY, {
            expiresIn: "3d"
        }
        )

        /// Here retrieving other fileds except the password
        const {password, ...others} = user._doc;
       // console.log(blazer1);
        // console.log(others)

       // res.send({...others, accessToken});
    if(!bankinfo)  res.render('user_home',{details: user,bankdetails: newUser,blazerData1: blazer1,blazerData2: blazer2,blazerData3: blazer3,
                            pantData1: pant1,pantData2: pant2,pantData3: pant3,shoeData1: shoe1,shoeData2: shoe2,shoeData3: shoe3});
    res.render('user_home',{details: user, bankdetails: bankinfo, blazerData1: blazer1,blazerData2: blazer2,blazerData3: blazer3,
                          pantData1: pant1,pantData2: pant2,pantData3: pant3,shoeData1: shoe1,shoeData2: shoe2,shoeData3: shoe3});
    } catch (error) {   
        res.send(error);
    }

});



router.post('/userHome', async (req, res)=>{
    // console.log("-->", req.body.userName);
    const userName = req.body.userName;
    const user = await User.findOne({ userName: userName })
    const userBankDetails = await UserBank.findOne({ userName: userName })
    
    const blazer1 = await shopProduct.findOne({ title: "BLAZER1"})
    const blazer2 = await shopProduct.findOne({ title: "BLAZER2"})
    const blazer3 = await shopProduct.findOne({ title: "BLAZER3"})
    const pant1 = await shopProduct.findOne({ title: "PANT1"})
    const pant2 = await shopProduct.findOne({ title: "PANT2"})
    const pant3 = await shopProduct.findOne({ title: "PANT3"})
    const shoe1 = await shopProduct.findOne({ title: "SHOE1"})
    const shoe2 = await shopProduct.findOne({ title: "SHOE2"})
    const shoe3 = await shopProduct.findOne({ title: "SHOE3"})

    res.render('user_home',{
        details: user, 
        bankdetails: userBankDetails, 
        blazerData1: blazer1, blazerData2: blazer2, blazerData3: blazer3,
        pantData1: pant1, pantData2: pant2, pantData3: pant3, 
        shoeData1: shoe1,shoeData2: shoe2,shoeData3: shoe3
    });
})


router.post('/bankinfo', async (req, res)=>{
    /// Validate the user for null userName, email, password   
    const user = await User.findOne({ userName: req.body.userName })
    const updatepopup = await User.updateOne(user, {
        $set: {popup : req.body.popup}
    },
    { new: true});
    const newUser = new UserBank({
        userName : req.body.userName,
        accountId : req.body.accountId,
        secretkey : req.body.secretKey
    })
    updatedUser = await User.findOne({ userName: req.body.userName })
    const blazer1 = await shopProduct.findOne({ title: "BLAZER1"})
    const blazer2 = await shopProduct.findOne({ title: "BLAZER2"})
    const blazer3 = await shopProduct.findOne({ title: "BLAZER3"})
    const pant1 = await shopProduct.findOne({ title: "PANT1"})
    const pant2 = await shopProduct.findOne({ title: "PANT2"})
    const pant3 = await shopProduct.findOne({ title: "PANT3"})
    const shoe1 = await shopProduct.findOne({ title: "SHOE1"})
    const shoe2 = await shopProduct.findOne({ title: "SHOE2"})
    const shoe3 = await shopProduct.findOne({ title: "SHOE3"})
   // console.log(newUser);
    try {
        const savedUser = await newUser.save();
        res.render('user_home',{details: updatedUser,bankdetails: savedUser,blazerData1: blazer1,blazerData2: blazer2,blazerData3: blazer3,
            pantData1: pant1,pantData2: pant2,pantData3: pant3,shoeData1: shoe1,shoeData2: shoe2,shoeData3: shoe3});
    }catch (err) {
        res.send(err);
    }
});




router.post('/transactioninfo', async (req, res)=>{
    // console.log(req.body.userName);
    // console.log("~", req.body.transactionId);
    
    const orderID = new Date().getTime()
    const user = await User.findOne({ userName: req.body.userName })
    const newUser = new TransactionInfo({
        userName : req.body.userName,
        accountId : req.body.accountId,
        secretkey : req.body.secretKey,
        amount : req.body.cost,
        orderID
    })
    // console.log(newUser);
    const accountId = newUser.accountId;
    const userAccountId = accountId;
    const userName = req.body.userName;
    const secretkey = newUser.secretkey;
    const amount = newUser.amount;
    const userAmount = amount;
    console.log(accountId, secretkey, amount, orderID);

    const url = 'http://localhost:4005/api/transaction/verifyAccAndTransaction';

    axios.post(url, {
        accountId: accountId,
        secretkey: secretkey,
        amount: amount,
        recAccId: "19982022002",
        recSecKey: "admin",
        orderID
  }).then(async function (response) {
        // console.log("====", req.body.length);
    const supAmount=Math.round((amount*90)/100);

    axios.post(url, {
        accountId: "19982022002",
        secretkey: "admin",
        amount: supAmount,
        recAccId: "19982022003",
        // recSeckey: "supplier",
        orderID       
    })
    .then(async function (response){
        const items=[];
    if(Array.isArray(req.body.title))
    {
        for(var i = 0;i<req.body.title.length;i++)
        {
            const cartProduct = new CartProducts({
                title : req.body.title[i],
                quantity : req.body.quantity[i]
            })

            const item = {
                    productTitle: req.body.title[i],
                    quantity: req.body.quantity[i]
                }
            items.push(item);
            
        // console.log(cartProduct);
            const savedCartProduct= await cartProduct.save();
        //  console.log(savedCartProduct);
            const quantityVal=req.body.quantity[i];
        //   console.log("----",quantityVal);
            const  productUpdate= await shopProduct.updateOne({title: req.body.title[i]}, {
            $inc: { quantity : -quantityVal}
         },
         { new: true});
        }
        const orderedProduct = new Orders({
                orderID,
                product: items,
                amount
            })
        console.log(orderedProduct);
        await orderedProduct.save();
    }
    
    else{
        const cartProduct = new CartProducts({
            title : req.body.title,
            quantity : req.body.quantity
        })

        const item = {
                    productTitle: req.body.title,
                    quantity: req.body.quantity
        }
        const orderedProduct = new Orders({
                orderID,
                product: item,
                amount
            })
        await orderedProduct.save();
        // console.log(cartProduct);
        const savedCartProduct= await cartProduct.save();
      //  console.log(savedCartProduct);
      const quantityVal=req.body.quantity;
    //   console.log("----",quantityVal);
        const  productUpdate= await shopProduct.updateOne({title: req.body.title}, {
            $inc: { quantity : -quantityVal}
         },
         { new: true});

    }
    console.log(response.data);

    const newOrderId = new OrderHistory({
        orderID,
        accountId : userAccountId,
        userName: userName,
        amount: userAmount
    })
    await newOrderId.save();

    // Retrieving transactionID to send it to the supplier 
    const allTransaction_url = `http://localhost:4005/api/transaction/userTransactions`;
    await axios.get(allTransaction_url).then(async docs=>{
        const list = docs.data;
        const srchedOrderList = list[list.length-1];
        console.log("srched = ", srchedOrderList);
        const orderLIST = await Orders.findOne({ orderID: srchedOrderList.orderID });
        console.log("orderList = ", orderLIST)

        const supplierURL = 'http://localhost:4010/api/orderList/add'
        axios.post(supplierURL, {
            transactionId: srchedOrderList.transactionId,
            orderList: orderLIST.product,
            amount: srchedOrderList.amount
        })
    })

    const blazer1 = await shopProduct.findOne({ title: "BLAZER1"})
    const blazer2 = await shopProduct.findOne({ title: "BLAZER2"})
    const blazer3 = await shopProduct.findOne({ title: "BLAZER3"})
    const pant1 = await shopProduct.findOne({ title: "PANT1"})
    const pant2 = await shopProduct.findOne({ title: "PANT2"})
    const pant3 = await shopProduct.findOne({ title: "PANT3"})
    const shoe1 = await shopProduct.findOne({ title: "SHOE1"})
    const shoe2 = await shopProduct.findOne({ title: "SHOE2"})
    const shoe3 = await shopProduct.findOne({ title: "SHOE3"})
    try {
        const savedUser = await newUser.save();
        res.render('user_home',{
            details: user,
            bankdetails: savedUser,
            blazerData1: blazer1, blazerData2: blazer2, blazerData3: blazer3,
            pantData1: pant1,     pantData2: pant2,     pantData3: pant3,
            shoeData1: shoe1,     shoeData2: shoe2,     shoeData3: shoe3
        });
    }catch (err) {
        res.send(err);
    }
    })
  })

});



router.get('/dashboard' ,async (req, res)=>{
    const allOrders = await OrderHistory.find();
    // console.log(allOrders);
    res.render('dashboard', {
        allOrders: allOrders
    })
})


router.get('/dashboard/:orderID', async (req, res)=>{
    const orderID = req.params.orderID;
    // console.log(orderID);
    const orderProducts = [];
    const orderLIST = await Orders.findOne({ orderID: orderID });
    orderProducts.push(orderLIST);
    const user = await TransactionInfo.findOne({ orderID: orderID })
    // console.log(user, "----==",orderLIST.orderID)

    res.render('orderList', {
        orderProducts: orderProducts,
        user
    })
})




// router.post('/orderList', async (req, res)=>{
//     const transactionId = req.body.transactionId;
//     const orderID = req.body.orderID;
//     const accountId = req.body.accountId;

//     const user = await TransactionInfo.findOne({ orderID: orderID })
//     const userName = user.userName;
//     console.log("Hiii", transactionId, orderID, accountId, userName);

//     const orderDetails = new TransactionFeedBack({
//         userName,
//         transactionId,
//         accountId,
//         orderID
//     })
//     await orderDetails.save();
//     res.send("paisi---->", orderDetails)
// })




router.get('/profile/:userName', async (req, res)=>{
    // console.log("--+++>", req.params.userName)
    const userName = req.params.userName;
    const serverAccDetails = await User.findOne({ userName: userName })
    const bankDetails = await UserBank.findOne({ userName: userName})
    // console.log(serverAccDetails, "--->", bankDetails);
    res.render('profile', {
        user: serverAccDetails,
        userName: serverAccDetails.userName,
        email: serverAccDetails.email,
        bankAccId : bankDetails.accountId
    });
})




router.get('/profile/purchaseHistory/:bankAccId', async (req, res)=>{
    const accountId = req.params.bankAccId;
    console.log(accountId)
    
    const user = await UserBank.findOne({ accountId: accountId })
    console.log(user)
    // console.log(accountId);
    const url = `http://localhost:4005/api/transaction/userTransactions`;
    
    await axios.get(url).then(docs=>{
        const allTransactions = docs.data;
        console.log("===", allTransactions.length);

        const userTransactions=[];
        for(let i=0; i<allTransactions.length; i++){
            // console.log("---", allTransactions[i]);
            if(allTransactions[i].accountId === accountId){
                console.log("~~~~", allTransactions[i].accountId)
                userTransactions.push(allTransactions[i]);
            }
        }
        console.log("------", userTransactions);
        const transactionTimeZone = []; 
        for(let i=0; i<userTransactions.length; i++)
        {
            const timezone = userTransactions[i].updatedAt;
            const time = new Date(timezone);
            const date = timezone.substring(0,10);

            const hours = time.getHours();
            const min = time.getMinutes();
            const sec = time.getSeconds();

            const actualTime = {
                date,
                hours,
                min,
                sec
            }
            transactionTimeZone.push(actualTime);
            // console.log(actualTime);
        }
        
        res.render('userTransactionList', {
            user: user,
            userTran: userTransactions,
            timezone: transactionTimeZone
        })
        // console.log("->>", userTransactions);
    }).catch(err=>{
        res.send(err);
    })    
})




router.get('/profile/purchaseHistory/:bankAccId/:transactionId', async (req, res)=>{
    const accountId = req.params.bankAccId;
    const transactionID = req.params.transactionId;

    const user = await UserBank.findOne({ accountId: accountId })
    // console.log(user)

    // console.log("------>", accountId, transactionID);
    const url = `http://localhost:4005/api/transaction/userTransactions`;

    await axios.get(url).then(async docs=>{
        const allTransactions = docs.data;

        const orderList=[]
        for(let i=0; i<allTransactions.length; i++)
        {
            // console.log("---", allTransactions[i]);
            if(allTransactions[i].accountId === accountId){
                if(allTransactions[i].transactionId === transactionID){
                    const orderID = allTransactions[i].orderID;
                    const item = await Orders.findOne({ orderID: orderID })
                    // console.log(item);
                    orderList.push(item)
                }
            }
        }
        // console.log(":::::", orderList);
        res.render('orderList', {
            user,
            orderProducts: orderList 
        })

    }).catch(err=>{
        res.send(err);
    })    
})

module.exports = router;