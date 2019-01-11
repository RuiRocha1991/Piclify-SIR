"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/commentsPhoto-controller');
const authService = require('../services/auth-service');

router.get("/getCountComments", authService.authorize, controller.countComments);
router.get("/getCommentsByPhoto", authService.authorize, controller.getCommentsByPhoto);
router.post("/addComment", authService.authorize, controller.addComment);
module.exports = router;