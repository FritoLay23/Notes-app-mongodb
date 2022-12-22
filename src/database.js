const mongoose = require('mongoose');

//Solo importan dos variables de process.env (Estas son variables globales).
const {MONGODB_HOST, MONGODB_DB} = process.env;

//Se hace una sola variable con la info de las dos variables anteriores.
const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DB}`;

//Esto es de la nueva actualizacion de moongose, no se muy bien pa que sirve pero es para que no de un error.
mongoose.set('strictQuery', true);

//Coneccion a la base de datos
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));