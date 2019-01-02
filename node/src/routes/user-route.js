"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/user-controller');
const authService = require('../services/auth-service');

router.get("/", authService.authorize, controller.get);
router.get("/getUserByEmail", controller.getUserByEmail);
router.get("/getFollowers", authService.authorize, controller.getNumberFollowers);
router.get("/getDetailsUserById", authService.authorize, controller.getDetailsUserById);
router.get("/isLogged", controller.isLogged);


router.post("/", controller.post);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

//router.post('/authenticate', controller.authenticate);
//router.post('/refresh-token',authService.authorize, controller.refreshToken);


module.exports = router;