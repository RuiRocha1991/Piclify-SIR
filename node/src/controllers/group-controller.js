"use strict";
const fetch = require('node-fetch');
const authService = require('../services/auth-service');


exports.createGroup= async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);  
    req.body.owner=data.id_user;
    try{
        fetch(global.URL_CONTROLLERS+'group.controller.php?action=create',
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

exports.getListGroupByUser= async (req, res, next)=>{
    try{
        fetch(global.URL_CONTROLLERS+'album.controller.php?action=getListGroupByUser',
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