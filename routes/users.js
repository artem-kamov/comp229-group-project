var express = require('express');
var router = express.Router();

let userController = require('../controllers/user');
let authController = require('../controllers/auth');

router.post('/signin', authController.signin);
router.get('/list', userController.list);
router.post('/create', userController.create);

router.param('userId', userController.userByID);
router.get('/get/:userId', userController.read);
router.put('/edit/:userId',
    authController.requireSignin,
    authController.hasAuthorization,
    userController.update);
router.delete('/delete/:userId',
    authController.requireSignin,
    authController.hasAuthorization,
    userController.remove);

router.put('/setadmin/:userId',
    authController.requireSignin,
    userController.setAdmin)

module.exports = router;
