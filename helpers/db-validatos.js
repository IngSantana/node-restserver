const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

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

/**
 *Categorias 
 */
const existeCategoriaPorId = async ( id ) => {

    const existeCategoria = await Categoria.findById(id);

    if (!existeCategoria) {
        throw new Error(`El id no existe ${ id } categoria`);
    }
}

/**
 *Productos 
 */
 const existeProductoPorId = async ( id ) => {

    const existeProducto = await Producto.findById(id);

    if (!existeProducto) {
        throw new Error(`El id no existe ${ id } producto`);
    }
}

/**
 * validar coleciones permitidas
 */

const coleccionesPermitidas = (coleccion = '', colecciones = [])=>{

    const incluida = colecciones.includes( coleccion );
    if(!incluida){
        throw new Error(`La coleccion ${ coleccion} no es permitida, ${ colecciones} `)
    }

    return true;
}



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}