"use strict";
const fetch = require('node-fetch');
const authService = require('../services/auth-service');

exports.getPhotosByUser= async (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await  authService.decodeToken(token);
    req.query.user=data.id_user;
    try{
        fetch(global.URL_CONTROLLERS+'photo.controller.php?action=getPhotosByUser',
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