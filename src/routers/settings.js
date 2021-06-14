/*

const express = require('express');
const router = new express.Router();
const ctrl = require('../controllers/settingsController')
const {upload, uploadError} = require('../middleware/upload');

*/

import express  from 'express';
import * as ctrl from '../controllers/settingsController';
import {upload, uploadError} from '../middleware/upload';

const router = new express.Router();


router.post('/settings', ctrl.updateSettings);
router.get('/settings', ctrl.getSettings);
router.get('/settings/aboutimg', ctrl.fetchAboutImg);
router.post('/settings/aboutimg',upload.single('aboutImgData'),  ctrl.uploadAboutImg, uploadError)

export default router;



