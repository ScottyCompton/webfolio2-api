const express = require('express');
const router = new express.Router();
const ctrl = require('../controllers/portfolioController');
const auth = require('../middleware/auth');

router.post('/portfolio/', auth, ctrl.createPortfolio);
router.get('/portfolio', ctrl.getPortfolio);
router.get('/portfolio/:id', ctrl.getPortfolioById);
router.patch('/portfolio/:id',auth,  ctrl.updatePortfolio);
router.delete('/portfolio/:id', auth, ctrl.deletePortfolio);
router.patch('/portfolio/publish/:id', auth, ctrl.togglePublished);
router.patch('/portfolio/moveauximgup/:id', auth, ctrl.moveAuxImgUp);
router.patch('/portfolio/moveauximgdown/:id', auth, ctrl.moveAuxImgDown);
router.delete('/portfolio/auximg/:id', auth, ctrl.deleteAuxImg);

module.exports = router;



