const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/',[
check('name', 'el nombre no puede estar vacio').not().isEmpty(),
check('password', 'la password debe tener mas de 6 caracteres').isLength({min: 6}),
check('email', 'el correo no es un correo valido').isEmail(),
check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
validarCampos
] ,usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;