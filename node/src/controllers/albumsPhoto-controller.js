"use strict";
const fetch = require('node-fetch');
const authService = require('../services/auth-service');

exports.countAlbumsByPhoto= async (req,res,next)=>{
    try{
        fetch(global.URL_CONTROLLERS+'albumsPhoto.controller.php?action=countAlbumsByPhoto',
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