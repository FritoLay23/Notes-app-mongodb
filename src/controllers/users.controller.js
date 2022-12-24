//Creamos un objeto para guardar todas las funciones
const usersCtrl = {};
const User = require('../models/User');

const passport = require('passport');

//funcion para el get(ruta) de /users/signup
usersCtrl.renderSignUpForm = (req, res) =>{
    res.render('users/signup');
};

//funcion para el post(ruta) de /users/signup
usersCtrl.signup = async (req, res) => {
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: 'Password do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Passwords must be at least 4 characters.'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, name, email});
    }else {
        const emailUser = await User.findOne({email});
        if(emailUser){
            req.flash('error_msg', 'The error is already in use.');
            res.redirect('/users/signup');
        }else {
            const newUser = User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin');
        }
    }
};

//funcion para el get(ruta) de /users/signin
usersCtrl.renderSigninForm = (req, res) =>{
    res.render('users/signin');
};

//funcion para el post(ruta) de /users/signin
usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

//funcion para el get(ruta) de /users/logout
usersCtrl.logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success_msg', 'You are logged out now.');
        res.redirect('/users/signin');
    });
};

module.exports = usersCtrl;