"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/photo-controller');
const authService = require('../services/auth-service');

router.get("/getPhotosByUser", authService.authorize, controller.getPhotosByUser);
module.exports = router;