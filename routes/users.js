const express = require('express');
const router = express.Router();
const usersController = require('../controller/users_controller');
const passport = require('passport');

router.get('/profile' , passport.checkAuthentication , usersController.profile);
router.get('/sign-up' , usersController.signUp);
router.get('/sign-in' , usersController.signIn);
router.post('/create' , usersController.create);

//Use Passport as Middleware to Authenticate
router.post('/create-session', passport.authenticate(
    'local' , 
    {failureRedirect: '/user/sign-in'},
) , usersController.createSession);

router.get('/sign-out' , usersController.signOut);

module.exports=router; 