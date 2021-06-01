const { response,request } = require('express');


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

const usuariosPost = (req, res = response) => {
    const {nombre,edad} = req.body;
    res.json({
        msg: 'get Post - controlador',
        nombre,
        edad
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