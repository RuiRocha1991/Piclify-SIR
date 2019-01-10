"use strict";
const fetch = require('node-fetch');
const authService = require('../services/auth-service');

exports.countComments= async (req,res,next)=>{
    try{
        fetch(global.URL_CONTROLLERS+'commentsPhoto.controller.php?action=countComments',
        {
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(req.query)
        })
        .then(data=> data.json())
        .then(data=> res.send(data));

    }catch(e){
        res.status(500).send({
            message:'Failure to process request'
        });
    }
}

exports.addComment= async (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await  authService.decodeToken(token);
    req.body.id_user=data.id_user;
    try{
        fetch(global.URL_CONTROLLERS+'commentsPhoto.controller.php?action=addComment',
        {
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(req.body)
        })
        .then(data=> data.json())
        .then(data=> res.send(data));

    }catch(e){
        res.status(500).send({
            message:'Failure to process request'
        });
    }
}