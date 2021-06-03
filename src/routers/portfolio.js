const express = require('express');
const router = new express.Router();
const ctrl = require('../controllers/portfolioController');
const auth = require('../middleware/auth');

router.post('/portfolio', auth, ctrl.createPortfolio);
router.get('/portfolio', ctrl.getPortfolio);
router.get('/portfolio/:id', ctrl.getPortfolioById);
router.patch('/portfolio/:id',auth,  ctrl.updatePortfolio);
router.delete('/portfolio/:id', auth, ctrl.deletePortfolio);
router.patch('/portfolio/publish/:id', auth, ctrl.togglePublished);
router.post('/portfolio/moveup', auth, ctrl.moveUp),
router.post('/portfolio/movedown', auth, ctrl.moveDown),
//router.patch('/portfolio/auximgs/:id', auth, ctrl.updateAuxImgs);

module.exports = router;



