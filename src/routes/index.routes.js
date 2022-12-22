//Exportamos solo el modulo router de express, esto es para las rutas.
const {Router} = require('express');
const router = Router();

//Exportamos las funciones para los get.
const {renderIndex, renderAbout} = require('../controllers/index.controller');

//Get(ruta) de index
router.get('/', renderIndex);

//Get(ruta) de about
router.get('/about', renderAbout);

module.exports = router;