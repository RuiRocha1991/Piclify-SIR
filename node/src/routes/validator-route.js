"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/validator-controller');
//const authService = require('../services/auth-service');

router.get("/isEmail", controller.isEmail);
router.get("/IsPassword", controller.isPassword);


module.exports = router;