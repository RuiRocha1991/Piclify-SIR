"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/user-controller');
//const authService = require('../services/auth-service');

router.get("/", controller.get);
router.get("/getFollowers", controller.getNumberFollowers);
router.get("/isLogged", controller.isLogged);
router.get("/logout", controller.logout);

router.post("/", controller.post);
router.post("/login", controller.login);

//router.post('/authenticate', controller.authenticate);
//router.post('/refresh-token',authService.authorize, controller.refreshToken);


module.exports = router;