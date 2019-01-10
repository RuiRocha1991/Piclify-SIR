"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/likesPhoto-controller');
const authService = require('../services/auth-service');

router.get("/getCountLikes", authService.authorize, controller.countLikes);
router.get("/isLikePhoto", authService.authorize, controller.isLikePhoto);
router.post("/addLike", authService.authorize, controller.addLike);
router.post("/removeLike", authService.authorize, controller.removeLike);
module.exports = router;