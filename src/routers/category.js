const express = require('express');
const router = new express.Router();
const ctrl = require('../controllers/categoryController')
const auth = require('../middleware/auth');

router.post('/categories', auth, ctrl.createCategory);
router.get('/categories', ctrl.getCategoryList);
router.get('/categories/:id', ctrl.getCategoryById);
router.patch('/categories/:id', auth, ctrl.updateCategory);
router.delete('/categories/:id', auth, ctrl.deleteCategory);
router.patch('/movecatdown/:id', auth, ctrl.moveDown);
router.patch('/movecatup/:id',auth, ctrl.moveUp);

module.exports = router;



