
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },

    email: {
        type: String,
        required: [true, 'el correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La password es requerida']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);
