"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
var cookieParser = require('cookie-parser');
const conn = require('./conn');
const config = require('./config');

const TWO_HOURS = 1000*60*60*2;

const {
    SESSION_LIFETIME = TWO_HOURS,
    SESSION_NAME = 'sid',
    NODE_ENV = 'development',
    SESSION_SECRET = 'AgB34KyRIH7MKBj1FxV2fhZcMdq6Yk6P'
} = process.env;

const IN_PROD = NODE_ENV === 'production';

// Carregar as rotas
const indexRoute= require('./routes/index-route');
const userRoute= require('./routes/user-route');
const albumRoute= require('./routes/album-route');
const groupRoute= require('./routes/group-route');
const groupUserRoute= require('./routes/groupUser-route');
const validatorRoute= require('./routes/validator-route');
const followerRoute=require('./routes/follower-route');
const photoRoute=require('./routes/photo-route');
const likesPhotoRoute=require('./routes/likesPhoto-route');
const commentsPhotoRoute=require('./routes/commentsPhoto-route');
const albumsPhotoRoute=require('./routes/albumsPhoto-route');
const groupsPhotoRoute=require('./routes/groupsPhoto-route');


app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: SESSION_LIFETIME,
        sameSite: true,
        secure:IN_PROD
    }
}));



app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use("/", indexRoute);
app.use("/user", userRoute);
app.use("/album", albumRoute);
app.use("/group", groupRoute);
app.use("/groupUser", groupUserRoute);
app.use("/validator", validatorRoute);
app.use("/follower", followerRoute);
app.use("/photo",photoRoute);
app.use("/likesPhoto",likesPhotoRoute);
app.use("/commentsPhoto",commentsPhotoRoute);
app.use("/albumsPhoto",albumsPhotoRoute);
app.use("/groupsPhoto",groupsPhotoRoute);



module.exports = app;