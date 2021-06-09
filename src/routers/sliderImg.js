const express = require('express');
const router = new express.Router();
const ctrl = require('../controllers/sliderImgController');

router.post('/sliderimgs', ctrl.createSliderImg);
router.get('/sliderimgs', ctrl.getAllSliderImgs);
router.get('/sliderimgs/:id', ctrl.getSingleSliderImg);
router.put('/sliderimgs/moveup/:id', ctrl.moveUp);
router.put('/sliderimgs/movedown/:id', ctrl.moveDown);
router.patch('/sliderimgs/:id', ctrl.setAsForegroundImg);
router.delete('/sliderimgs/:id', ctrl.deleteSliderImg);
module.exports = router;



