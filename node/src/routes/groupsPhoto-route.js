"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/groupsPhoto-controller');
const authService = require('../services/auth-service');

router.get("/getCountGroupsByPhoto", authService.authorize, controller.countGroupsByPhoto);
module.exports = router;