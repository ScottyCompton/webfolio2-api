
import express from 'express';
import * as ctrl from '../controllers/contactItemController';
import auth from '../middleware/auth';

const router = new express.Router();

router.get('/contactitems', ctrl.getContactItemList);
router.post('/contactitems',auth, ctrl.createContactItem);
router.put('/contactitems/:id',auth, ctrl.updateContactItem);
router.delete('/contactitems/:id',auth,  ctrl.deleteContactItem);
router.patch('/contactitems', auth, ctrl.moveContactItem);

export default router;
