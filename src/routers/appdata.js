/*const express = require('express');
const router = new express.Router();
const ctrl = require('../controllers/appDataController');

router.get('/appdata/', ctrl.getAllAppData);

module.exports = router;

*/

import express from 'express';
import * as ctrl from '../controllers/appDataController';

const router = new express.Router();
router.get('/appdata/', ctrl.getAllAppData);

export default router;
