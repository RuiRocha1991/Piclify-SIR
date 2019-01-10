'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/follower-controller');
const authService = require('../services/auth-service');

router.post('/addFollower', authService.authorize, controller.addFollower);

router.post('/removeFollower', authService.authorize, controller.removeFollower);

router.get('/verifyFollower', authService.authorize, controller.verifyFollower);

module.exports=router;