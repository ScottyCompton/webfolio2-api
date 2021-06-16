

import express from 'express';
import * as ctrl from '../controllers/appDataController';

const router = new express.Router();
router.get('/', ctrl.getAllAppData);

export default router;
