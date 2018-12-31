"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/album-controller');
const authService = require('../services/auth-service');

router.get("/getListAlbums", authService.authorize, controller.getListAlbums);

router.post('/createAlbum',  authService.authorize, controller.createAlbum);

module.exports = router;