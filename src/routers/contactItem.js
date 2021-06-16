
import express from 'express';
import * as ctrl from '../controllers/contactItemController';
import auth from '../middleware/auth';

const router = new express.Router();

router.get('/contactitems', ctrl.getContactItemList);
router.post('/contactitem',auth, ctrl.createContactItem);
router.put('/contactitem/',auth, ctrl.updateContactItem);
router.delete('/contactitem/:id',auth,  ctrl.deleteContactItem);

export default router;
