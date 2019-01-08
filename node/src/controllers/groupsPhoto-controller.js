"use strict";
const fetch = require('node-fetch');
const authService = require('../services/auth-service');

exports.countGroupsByPhoto= async (req,res,next)=>{
    try{
        fetch(global.URL_CONTROLLERS+'groupsPhoto.controller.php?action=countGroupsByPhoto',
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

exports.addPhotoInGroup= async (req,res,next)=>{
    try{
        fetch(global.URL_CONTROLLERS+'groupsPhoto.controller.php?action=addPhotoInGroup',
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

exports.removeGroupOfPhoto= async (req,res,next)=>{
    try{
        fetch(global.URL_CONTROLLERS+'groupsPhoto.controller.php?action=removeGroupOfPhoto',
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