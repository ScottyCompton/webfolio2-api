
import express from 'express';
import * as ctrl from '../controllers/categoryController';
import auth from '../middleware/auth';
const router = new express.Router();

router.post('/categories', auth, ctrl.createCategory);
router.get('/categories', ctrl.getCategoryList);
router.get('/categories/:id', ctrl.getCategoryById);
router.patch('/categories/:id', auth, ctrl.updateCategory);
router.delete('/categories/:id', auth, ctrl.deleteCategory);
router.patch('/movecatdown/:id', auth, ctrl.moveDown);
router.patch('/movecatup/:id',auth, ctrl.moveUp);

export default router;


