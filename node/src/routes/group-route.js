"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/group-controller');
const authService = require('../services/auth-service');

router.get("/getListGroupOfUser", authService.authorize, controller.getListGroupOfUser);

router.post('/createGroup',  authService.authorize, controller.createGroup);

module.exports = router;