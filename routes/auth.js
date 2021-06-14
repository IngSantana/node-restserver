const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignin } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'el correo no es un correo valido').isEmail(),
    check('password', 'el password no puede estar vacio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'el token es necesario').not().isEmpty(),
    validarCampos
], googleSignin);




module.exports = router;