const {
    Router
} = require('express');

const {
    check
} = require('express-validator');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');

const {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
} = require('../helpers/db-validatos');

const {
    validarCampos
} = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id',[
check('id','No es un ID valido').isMongoId(),
check('id').custom( existeUsuarioPorId),
check('rol').custom( esRolValido),
validarCampos
],usuariosPut);

router.post('/', [
    check('name', 'el nombre no puede estar vacio').not().isEmpty(),
    check('password', 'la password debe tener mas de 6 caracteres').isLength({
        min: 6
    }),
   // check('email', 'el correo no es un correo valido').isEmail(),
    check('email').custom(emailExiste),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;