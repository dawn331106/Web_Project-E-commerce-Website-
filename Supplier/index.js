const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path')

const orderListRoute = require('./API_routes/orderListRoute')

const serverRoutes = require('./serverRoutes/router') 

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB has been connected !")
}).catch(err=>{
    console.log("Error is: ", err)
})

app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/orderList', orderListRoute);
// app.use('/api/transaction', transactionDetailsCheck)

app.use("/css", express.static(path.resolve(__dirname, "assets/css")))
app.use("/img", express.static(path.resolve(__dirname, "assets/img")))
app.use("/js", express.static(path.resolve(__dirname, "assets/js")))

app.use('/', serverRoutes);

const port = 4010;
app.listen(port, (req, res)=>{
    console.log(`Server is running at http://localhost:${port}`);
})