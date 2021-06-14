
import express from 'express';
import * as ctrl from '../controllers/portfolioController';
import auth from '../middleware/auth';
import {upload, uploadError} from '../middleware/upload';

const router = new express.Router();

router.post('/portfolio', auth, ctrl.createPortfolio);
router.get('/portfolio', ctrl.getPortfolio);
router.get('/portfolio/:id', ctrl.getPortfolioById);
router.patch('/portfolio/:id',auth,  ctrl.updatePortfolio);
router.delete('/portfolio/:id', auth, ctrl.deletePortfolio);
router.patch('/portfolio/publish/:id', auth, ctrl.togglePublished);
router.post('/portfolio/moveup', auth, ctrl.moveUp);
router.post('/portfolio/movedown', auth, ctrl.moveDown);
router.get('/portfolio/:id/previewimg', ctrl.fetchPreviewImage);
router.post('/portfolio/:id/previewimg', auth, upload.single('previewImgData'),  ctrl.uploadPreviewImage, uploadError);
router.delete('/portfolio/:id/previewimg', auth, ctrl.deletePreviewImage);
router.get('/portfolio/:id/auximg/:auximgid', ctrl.fetchAuxImage);
router.delete('/portfolio/:id/auximg/:auximgid', auth, ctrl.deleteAuxImage);
router.post('/portfolio/:id/auximg', auth, upload.single('auxImgData'), ctrl.uploadAuxImage, uploadError);

export default router;



