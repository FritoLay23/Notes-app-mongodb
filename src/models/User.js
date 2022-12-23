const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

//Clase del Schema de Users.
const UserSchema = new Schema({
    name: { type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
}, {
    timestamps: true
});

//Creamos o definimos un metodo para esta clase y poder encriptar la contraseña
// Sintaxis = claseSchema + methods + nombredelmetodo_que quieras crear + function
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

//Creamos un metodo para poder comparar la contraseña tipeada por el usuario y la contraseña que esta en la base de datos
//Este metodo es para cuando el usuario entre osea para el login
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

//Modelo y a la vez exportamos el modelo
module.exports = model('User', UserSchema);