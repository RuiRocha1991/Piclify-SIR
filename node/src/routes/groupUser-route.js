"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/groupUser-controller');
const authService = require('../services/auth-service');

router.get("/addUserToGrupo", authService.authorize, controller.addUserToGrupo);

router.post('/getListGroupByUser',  authService.authorize, controller.getListGroupByUser);

module.exports = router;