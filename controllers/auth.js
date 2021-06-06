const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req, res = response) => {

    const {
        email,
        password
    } = req.body;

    try {

        //verificar si el email existe
        const usuario =  await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo"
            });
        }
        //Si el usuario esta activo

        if(!usuario.status){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado: false"
            });
        }

        //verificar la password

        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if (!validPassword ){
            return res.status(400).json({
                msg: "Usuario / Password no es correcta - password"
            });
        }

        //generar el JWT
        const token = await generarJWT( usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    login
}