"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/groupsPhoto-controller');
const authService = require('../services/auth-service');

router.get("/getCountGroupsByPhoto", authService.authorize, controller.getCountGroupsByPhoto);
router.get("/getGroupsByPhoto", authService.authorize, controller.getGroupsByPhoto);
router.post("/addPhotoInGroup", authService.authorize, controller.addPhotoInGroup);
router.post("/removeGroupOfPhoto", authService.authorize, controller.removeGroupOfPhoto);
module.exports = router;