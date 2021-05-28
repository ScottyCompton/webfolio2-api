
const express = require('express');
const router = new express.Router();
const ctrl = require('../controllers/usersController')
const auth = require('../middleware/auth');

router.post('/users', auth, ctrl.createUser);
router.get('/users/me', auth ,ctrl.getAuthenticatedUser);
router.post('/users/logout', auth, ctrl.logoutUser)
router.post('/users/logoutAll', auth, ctrl.logoutAllSessions)
router.get('/users/', auth ,ctrl.getUserList);
router.get('/users/:id',auth, ctrl.getUserById);
router.patch('/users/:id', auth, ctrl.updateUser);
router.delete('/users/:id', auth, ctrl.deleteUser)
router.post('/users/login', ctrl.authenticateUser);


module.exports = router;



