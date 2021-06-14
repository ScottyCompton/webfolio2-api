
import express  from 'express';
import * as ctrl from '../controllers/settingsController';
import auth from '../middleware/auth';
import {upload, uploadError} from '../middleware/upload';

const router = new express.Router();


router.post('/settings',auth, ctrl.updateSettings);
router.get('/settings', ctrl.getSettings);
router.get('/settings/aboutimg', ctrl.fetchAboutImg);
router.post('/settings/aboutimg',auth, upload.single('aboutImgData'),  ctrl.uploadAboutImg, uploadError)

export default router;



