//Creamos un objeto que guarde la funcion.
const helpers = {};

//Ceamos una funcion que se encarga de verificar si el usuario esta autenticado.
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/users/signin');
};

module.exports = helpers;