const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controller/users_controller');

router.get('/sign-in', usersController.signIn);

router.get('/sign-up', usersController.signUp);

router.get('/profile', passport.checkAuthentication, usersController.profile);

router.post('/create', usersController.create);

// using passport as a middleware to authenticate
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/user/sign-in' }), usersController.createSession);

router.get('/sign-out', usersController.destroy);

module.exports = router;