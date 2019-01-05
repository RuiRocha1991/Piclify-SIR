"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/likesPhoto-controller');
const authService = require('../services/auth-service');

router.get("/getCountLikes", authService.authorize, controller.countLikes);
module.exports = router;