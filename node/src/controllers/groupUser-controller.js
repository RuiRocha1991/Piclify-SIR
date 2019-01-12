"use strict";
const fetch = require('node-fetch');
const authService = require('../services/auth-service');


exports.addUserToGroup= async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);  
    req.body.user=data.id_user;
    try{
        fetch(global.URL_CONTROLLERS+'groupUser.controller.php?action=create',
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
        .then(function(data){
            res.send(data);
        })
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição'
        });
    }
};

exports.removeUserFromGroup= async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);  
    req.body.user=data.id_user;
    try{
        fetch(global.URL_CONTROLLERS+'groupUser.controller.php?action=delete',
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
        .then(function(data){
            res.send(data);
        })
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição'
        });
    }
};

exports.getListGroupsByUser= async (req, res, next)=>{
    try{
        fetch(global.URL_CONTROLLERS+'groupUser.controller.php?action=getListGroupsByUser',
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
        .then(d =>  res.send(d) );
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição'
        });
    }
}

exports.getListUsersByGroup= async (req, res, next)=>{
    try{
        fetch(global.URL_CONTROLLERS+'groupUser.controller.php?action=getListUsersByGroup',
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
        .then(d =>  res.send(d) );
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição'
        });
    }
}