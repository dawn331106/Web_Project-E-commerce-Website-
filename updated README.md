# Web_Project-E-commerce-Website-

## Overview
A group project of fully functional E-commerce website. The whole project is connected with 3 different organizations with 3 different major API. Like: <br/>
### An e-commerce platform: <br/>
Contains any amount of products of three different categories (e.g. Blazer, Pant, Shoe). <br/>
### A Bank Server: <br/>
To facilitate all transactions of the users to buy any product. <br/>
### A Supplier: <br/>
To supply all the necessary products ordered by the users. Here, the admin submits a token of the ordered products to the supplier with the unique transaction number provided by the bank.


## How to run?
1. Clone the whole project then seperate the three folders. <br/>
2. Install dependencies for each of those three different folders.<br/>
```
npm i axios body-parser crypto-js .env express jsonwebtoken mongoose nodemon path ejs
```
3. Run the following command for deploying the three servers in each folder.<br/>
```
npm start
```
