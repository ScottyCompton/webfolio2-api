const express = require('express');
const router = new express.Router();
const ctrl = require('../controllers/portfolioController');
const auth = require('../middleware/auth');
const {upload, uploadError} = require('../middleware/upload');

router.post('/portfolio', auth, ctrl.createPortfolio);
router.get('/portfolio', ctrl.getPortfolio);
router.get('/portfolio/:id', ctrl.getPortfolioById);
router.patch('/portfolio/:id',auth,  ctrl.updatePortfolio);
router.delete('/portfolio/:id', auth, ctrl.deletePortfolio);
router.patch('/portfolio/publish/:id', auth, ctrl.togglePublished);
router.post('/portfolio/moveup', auth, ctrl.moveUp);
router.post('/portfolio/movedown', auth, ctrl.moveDown);
router.get('/portfolio/:id/previewimg', ctrl.fetchPreviewImage);
router.post('/portfolio/:id/previewimg',  upload.single('previewImgData'),  ctrl.uploadPreviewImage, uploadError);
router.delete('/portfolio/:id/previewimg', ctrl.deletePreviewImage);
router.get('/portfolio/:id/auximg/:auximgid', ctrl.fetchAuxImage);
router.delete('/portfolio/:id/auximg/:auximgid', ctrl.deleteAuxImage);
router.post('/portfolio/:id/auximg', upload.single('auxImgData'), ctrl.uploadAuxImage, uploadError);

module.exports = router;



