const express = require('express');
const router = new express.Router();
const ctrl = require('../controllers/settingsController')

router.post('/settings', ctrl.updateSettings);
router.get('/settings', ctrl.getSettings);

module.exports = router;



