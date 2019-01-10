'use strict';
const fetch = require('node-fetch');
const authService= require('../services/auth-service');

exports.addFollower = async (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);  
    req.body.id_follower=data.id_user;
    try{
        fetch(global.URL_CONTROLLERS+'follower.controller.php?action=addFollower',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(req.body) 
        }
        )
        .then(data => data.json())
        .then( async function(data){
            res.send(data);
        })
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição'
        });
    }
}

exports.verifyFollower= async (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);  
    req.query.id_follower=data.id_user;
    try{
        fetch(global.URL_CONTROLLERS+'follower.controller.php?action=verifyFollower',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(req.query) 
        }
        )
        .then(data => data.json())
        .then( async function(data){
            res.send(data);
        })
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição'
        });
    }
}

exports.removeFollower= async (req,res, next)=>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);  
    req.body.id_follower=data.id_user;
    try{
        fetch(global.URL_CONTROLLERS+'follower.controller.php?action=removeFollower',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(req.body) 
        }
        )
        .then(data => data.json())
        .then( async function(data){
            res.send(data);
        })
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição'
        });
    }
}