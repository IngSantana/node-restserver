
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


module.exports = model('usuario', UsuarioSchema);
