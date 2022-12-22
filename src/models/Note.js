const {Schema, model} = require('mongoose');

//Clase del Schema de Notes.
const NoteSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
}, {
    timestamps: true
});

//Modelo y a la vez exportamos el modelo
module.exports = model('Note', NoteSchema);