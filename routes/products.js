var express = require('express');
var router = express.Router();

let productController = require("../controllers/product");
let authController= require ("../controllers/auth")

/* GET list of products */
router.get('/list',productController.list )

/* GET one product by ID */
router.get('/get/:id', productController.listOne)

/* POST Route for creating new product */
router.post('/get/:id', productController.processAddProduct)

/* Router to edit listed product */
router.put('/edit/:id', 
    authController.requireSignin, 
    authController.isAllowed,
    productController.update);

/* Router to delete product */
router.delete('/delete/:id', 
    authController.requireSignin, 
    authController.isAllowed, 
    productController.erase);

module.exports = router;