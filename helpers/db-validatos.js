const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existsRol = await Role.findOne({
        rol
    });
    if (!existsRol) {
        throw new Error(`El rol  ${rol} no esta registado en la BD`)
    }
}

//verificar si el correo existe
const emailExiste = async (email = '') => {

    const emailExist = await Usuario.findOne({
        email
    });
    if (emailExist) {
        throw new Error(`El email  ${email} ya esta en uso`);
    }
}

//verificar si el usuario existe
const existeUsuarioPorId = async (id) => {

    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id no existe ${ id }`);
    }
}



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}