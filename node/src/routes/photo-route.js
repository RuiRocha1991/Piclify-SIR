"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/photo-controller');
const authService = require('../services/auth-service');

router.get("/getPhotosByUser", authService.authorize, controller.getPhotosByUser);
router.get("/getPhotoById", authService.authorize, controller.getPhotoById);
router.get("/getPhotosToVisitorByUser", authService.authorize, controller.getPhotosToVisitorByUser);
router.get("/getPhotosToVisitorById", authService.authorize, controller.getPhotosToVisitorById);
router.get("/getPhotosToMyProfile", authService.authorize, controller.getPhotosToMyProfile);
router.post("/update_photo", authService.authorize, controller.update_photo);
module.exports = router;