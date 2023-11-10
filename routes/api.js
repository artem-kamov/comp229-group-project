var express = require('express');
var productController = require("../controllers/product");
var userController =  require ("../controllers/user");
var router = express.Router();

/* Products ENDPOINTS */
router.get('/products', productController.list);
router.get('/products/:id', productController.listOne);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.erase);

/* Users ENDPOINTS */
router.get('/users', userController.list);
router.get('/users/:id', userController.listOne);
router.post('/users', userController.create);
router.put('/userss/:id', userController.update);
router.delete('/users/:id', userController.erase);

module.exports = router;
