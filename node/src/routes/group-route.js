"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/group-controller');
const authService = require('../services/auth-service');

router.get("/getListGroupByUser", authService.authorize, controller.getListGroupByUser);

router.post('/createGroup',  authService.authorize, controller.createGroup);

module.exports = router;