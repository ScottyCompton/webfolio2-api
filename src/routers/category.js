const express = require('express');
const router = new express.Router();
const ctrl = require('../controllers/categoryController')

router.post('/categories', ctrl.createCategory);
router.get('/categories', ctrl.getCategoryList);
router.get('/categories/:id', ctrl.getCategoryById);
router.patch('/categories/:id', ctrl.updateCategory);
router.delete('/categories/:id', ctrl.deleteCategory);
router.patch('/movecatdown/:id', ctrl.moveDown);
router.patch('/movecatup/:id', ctrl.moveUp);

module.exports = router;



