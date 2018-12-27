"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require('./config');


// Carregar as rotas
const indexRoute= require('./routes/index-route');
const userRoute= require('./routes/user-route');
/*const customerRoute= require('./routes/customer-route');
const orderRoute= require('./routes/order-routes');*/

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use("/", indexRoute);
app.use("/user", userRoute);
/*app.use('/customers', customerRoute);
app.use('/orders', orderRoute);*/

module.exports = app;