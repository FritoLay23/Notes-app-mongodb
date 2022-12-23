const {Router} = require('express');
const router = Router();

const {renderSignUpForm, renderSigninForm, signin, signup, logout} = require('../controllers/users.controller');

//Sign UP
router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup);

//Sign IN
router.get('/users/signin', renderSigninForm);

router.post('/users/signin', signin);

//Logout
router.get('/users/logout', logout);

module.exports = router;