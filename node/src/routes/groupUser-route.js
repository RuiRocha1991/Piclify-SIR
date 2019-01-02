"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/groupUser-controller');
const authService = require('../services/auth-service');

router.post("/addUserToGroup", authService.authorize, controller.addUserToGroup);

router.get('/getListGroupsByUser',  authService.authorize, controller.getListGroupsByUser);
router.get('/getListUsersByGroup',  authService.authorize, controller.getListUsersByGroup);

module.exports = router;