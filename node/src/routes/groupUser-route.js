"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/groupUser-controller');
const authService = require('../services/auth-service');

router.post("/addUserToGroup", authService.authorize, controller.addUserToGroup);

router.get('/getListGroupsByUser',  authService.authorize, controller.getListGroupsByUser);

module.exports = router;