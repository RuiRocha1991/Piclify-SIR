"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/albumsPhoto-controller');
const authService = require('../services/auth-service');

router.get("/getCountAlbumsByPhoto", authService.authorize, controller.countAlbumsByPhoto);
module.exports = router;