const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User'); 

//Esta es la estrategia que vamos a utilizar para validar el usuario.
// Osea poder hacer login
passport.use(new LocalStrategy({
    usernameField: 'email', //Aqui le estoy indicando que los textbox tienen el nombre de email y password.
    passwordField: 'password'
}, async (email, password, done) => {
    
    //Match Email's user
    const user = await User.findOne({email});
    if (!user) {
        return done(null, false, {message: 'Not User Found'})
    }else {
        //Match Password's User
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        }else {
            return done(null, false, {message: 'Incorrect Password'});
        }
    }
}));

//Serializando el usuario, esto significa que los datos del usuario se va
// a reducir a un solo dato que lo identifique, en este caso el id.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Deserializar, esto seria lo contrario a serializar. Es decir, con el id va a 
//volver a obtener todas las informaciones del usuario.
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});