const {
    response,
    request
} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



const usuariosGet = async (req = request, res = response) => {

    const {
        limite = 5, desde = 0
    } = req.query;

    const query = {
        status: true
    };

  //  const usuarios = await Usuario.find(query)
  //      .skip(Number(desde))
  //      .limit(Number(limite));

  //  const total = await Usuario.countDocuments(query);


//se redujo a la mitad el tiempo de ejecucion 
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])


    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {





    const {
        name,
        email,
        password,
        rol
    } = req.body;
    const usuario = new Usuario({
        name,
        email,
        password,
        rol
    });


    //Encriptar la password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    //guardar en db
    await usuario.save();

    res.json({
        msg: 'get Post - controlador',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {
    const {
        id
    } = req.params;

    const {
        _id,
        password,
        google,
        email,
        ...resto
    } = req.body;

    //Validar contra base de datos
    if (password) {
        //Encriptar la password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);

}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'get Patch - controlador'
    });
}

const usuariosDelete = async(req, res) => {
const { id } = req.params;

//Fisicamente lo borramos
//const usuario = await Usuario.findByIdAndDelete( id);

const usuario = await Usuario.findByIdAndUpdate( id, {status: false});

    res.json({
        usuario
    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}