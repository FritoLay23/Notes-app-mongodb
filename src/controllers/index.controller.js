//Creamos un objeto para guardar todas las funciones
const indexCtrl = {};

//funcion para el get(ruta) de index
indexCtrl.renderIndex = (req, res) => {
    res.render('index');
};

//funcion para el get(ruta) de about
indexCtrl.renderAbout = (req, res) => {
    res.render('about');
};

module.exports = indexCtrl;