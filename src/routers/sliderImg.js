/*
const express = require('express');
const ctrl = require('../controllers/sliderImgController');
const {upload, uploadError} = require('../middleware/upload');
*/

import express from 'express';
import * as ctrl from '../controllers/sliderImgController';
import {upload, uploadError} from '../middleware/upload';


const router = new express.Router();


router.post('/sliderimgs/:orientation',upload.single('sliderImgData'), ctrl.uploadSliderImg, uploadError);
router.get('/sliderimgs', ctrl.getAllSliderImgs);
router.get('/sliderimgs/:id', ctrl.fetchSliderImg);
router.put('/sliderimgs/moveup/:id', ctrl.moveUp);
router.put('/sliderimgs/movedown/:id', ctrl.moveDown);
router.patch('/sliderimgs/:id', ctrl.setAsForegroundImg);
router.delete('/sliderimgs/:id', ctrl.deleteSliderImg);

export default router;



