const express = require('express');
const router = new express.Router();
const ctrl = require('../controllers/settingsController')
const {upload, uploadError} = require('../middleware/upload');


router.post('/settings', ctrl.updateSettings);
router.get('/settings', ctrl.getSettings);
router.get('/settings/aboutimg', ctrl.fetchAboutImg);
router.post('/settings/aboutimg',upload.single('aboutImgData'),  ctrl.uploadAboutImg, uploadError)
module.exports = router;



