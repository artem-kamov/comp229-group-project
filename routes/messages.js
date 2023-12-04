var express = require('express');
var router = express.Router();

let messagesController = require("../controllers/message");
let authController = require("../controllers/auth");

// Unprotected routes

/* GET messages from one product */
router.get('/get-product-messages/:id', messagesController.findThreadByProductId)

/* POST to create new question. */
router.post('/create-question', messagesController.postMessage)

// Protected routes
/* POST to create new answer. */
router.post('/create-answer', authController.requireSignin, messagesController.postMessage)

/* Router to edit message */
router.put('/edit/:id',
  authController.requireSignin,
  messagesController.updateMessage);

/* Router to delete product */
router.delete('/delete/:id',
  authController.requireSignin,
  messagesController.eraseMessage);

module.exports = router;