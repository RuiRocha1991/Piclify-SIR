"use strict";

const ValidationContract=require('../validators/fluent-validator');

exports.isEmail= async (req, res, next)=>{
    let contract = new ValidationContract();
    contract.isEmail(req.query.email,'Email is not valid');
    if(!contract.isValid()){
        res.status(200).send(contract.errors());
        return;
    }
    res.status(200).send(contract.errors());
}

exports.isPassword= async (req, res, next)=>{
    let contract = new ValidationContract();
    contract.isPassword(req.query.password,'Password is not valid');

    if(!contract.isValid()){
        res.status(200).send(contract.errors());
        return;
    }
    res.status(200).send(contract.errors());
}