"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/albumsPhoto-controller');
const authService = require('../services/auth-service');

router.get("/getCountAlbumsByPhoto", authService.authorize, controller.countAlbumsByPhoto);
router.get("/getAlbumsByPhoto", authService.authorize, controller.getAlbumsByPhoto);
router.get("/getPhotosByAlbum", authService.authorize, controller.getPhotosByAlbum);
router.get("/getPhotosToVisitorByAlbum", authService.authorize, controller.getPhotosToVisitorByAlbum);

router.post("/addPhotoInAlbum", authService.authorize, controller.addPhotoInAlbum);
router.post("/removeAlbumOfPhoto", authService.authorize, controller.removeAlbumOfPhoto);
module.exports = router;