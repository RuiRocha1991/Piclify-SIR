"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/group-controller');
const authService = require('../services/auth-service');

router.get("/getListGroupById", authService.authorize, controller.getListGroupById);
router.get("/getGroupByTitleOrDescription", controller.getGroupByTitleOrDescription);

router.post('/createGroup',  authService.authorize, controller.createGroup);

module.exports = router;