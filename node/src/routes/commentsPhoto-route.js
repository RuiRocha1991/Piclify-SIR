"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/commentsPhoto-controller');
const authService = require('../services/auth-service');

router.get("/getCountComments", authService.authorize, controller.countComments);
module.exports = router;