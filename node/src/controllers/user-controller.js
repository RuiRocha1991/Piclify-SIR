"use strict";
const fetch = require('node-fetch');
const request  = require('request-promise');
/*const ValidationContract=require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository')
const md5 = require('md5');
const authService = require('../services/auth-service');
const emailService = require('../services/email-service');*/


exports.post= async (req, res, next) => {
/*let contract = new ValidationContract();
    contract.hasMinLen(req.body.name,3,'o nome esta pequeno');
    contract.isEmail(req.body.email,'o email invalido');
    contract.hasMinLen(req.body.password,6,'a senha esta pequena');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }*/
    try{
        fetch(global.URL_CONTROLLERS+'user.controller.php?action=create',
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
        .then(data => res.send(data));
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição'
        });
    }
};

exports.get= async (req, res, next)=>{
    try{
        fetch(global.URL_CONTROLLERS+'user.controller.php?action=getUserByEmail',
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
        .then(d => res.send(d)  );
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição'
        });
    }
       
}

/*exports.authenticate= async (req, res, next) => {
        try{
            const customer = await repository.authenticate({
                email : req.body.email,
                password: md5(req.body.password + global.SALT_KEY)
            })

            console.log(customer);

            if(!customer){
                res.status(404).send({ message:'utilizador ou senha invalidos'});
                return;
            }

            const token = await authService.generateToken({id: customer._id, email: customer.email,name:customer.name, roles:customer.roles})
            res.status(201).send({
                token :token,
                data: {
                    email:customer.email,
                    name:customer.name
                }
            });
        }catch(e){
            res.status(500).send({
                message:'Falha ao processar requisição'
            });
        }
};

exports.refreshToken= async (req, res, next) => {
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if(!customer){
            res.status(401).send({ message:'Cliente não encontrado'});
            return;
        }

        const tokenData = await authService.generateToken({id: customer._id, email: customer.email,name:customer.name, roles:customer.roles})
        res.status(201).send({
            token :tokenData,
            data: {
                email:customer.email,
                name:customer.name
            }
        });
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição'
        });
    }
};*/
