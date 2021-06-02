const { response,request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



const usuariosGet = (req = request, res = response) => {
    const {q,nombre = 'no name',apikey,page,limit} = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = async (req, res = response) => { 

 



    const {name, email, password, rol} = req.body;
    const usuario =  new Usuario( {name, email, password, rol} );

    //verificar si el correo existe
    const emailExist = await Usuario.findOne({email});
        if(emailExist){
            return res.status(400).json({
                msg: "El correo ingresado ya esta en uso"
            });
        }
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

const usuariosPut = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'get Put - controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'get Patch - controlador'
    });
}

const usuariosDelete = (req, res) => {

    res.json({
        msg: 'get Delete - controlador'
    });
}



module.exports = {
    usuariosGet,usuariosPut,usuariosPost,usuariosPatch,usuariosDelete
}