const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const router = require('express').Router();


/// REGISTER
router.post('/register', async (req, res)=>{

    /// Validate the user for null userName, email, password   
    const newUser = new User({
        userName : req.body.userName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString()
    })

    try {
        const savedUser = await newUser.save();
        console.log(newUser);
        res.send(savedUser);
    }catch (err) {
        res.send(err);
    }
});
// exports.createUser = async (req, res)=>{

//     /// Validate the user for null userName, email, password   
//     const newUser = new User({
//         userName : req.body.userName,
//         email: req.body.email,
//         password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString()
//     })

//     try {
//         const savedUser = await newUser.save();
//         res.send(savedUser)
//     }catch (err) {
//         res.send(err);
//     }
// };



///LOGIN
router.post('/login', async (req, res)=>{
    try {
        const user = await User.findOne({ userName: req.body.userName })
        if(!user) res.send("Wrong Identity...!")

        const decrpted_Hash_Password = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC_KEY);
        const originalPassword = decrpted_Hash_Password.toString(CryptoJS.enc.Utf8);
        
        if(originalPassword != req.body.password) res.send("Your username or password is incorrect!")

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC_KEY, {
            expiresIn: "3d"
        }
        )

        /// Here retrieving other fileds except the password
        const {password, ...others} = user._doc;
        // console.log(others)

        res.send({...others, accessToken});

    } catch (error) {   
        res.send(error);
    }

})

module.exports = router;