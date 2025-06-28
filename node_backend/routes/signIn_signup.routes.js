const express = require('express');
const router = express.Router();
const controller = require('../Controllers/sign_in.controller');

router.post('/signUpUser', controller.signUpUser);  
router.post('/signIn', controller.signInUser);
router.get('/userProfile', controller.userProfile);
router.post('/addpropertypost', controller.createPropertyPost);

router.all('/{*any}', (req, res, next) => {
  res.status(404).send("404 Error: Page not found.");
})

module.exports = router;
