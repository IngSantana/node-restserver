const {
    Router
} = require('express');

const {
    check
} = require('express-validator');

const {
    login
} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/login',[
    check('email', 'el correo no es un correo valido').isEmail(),
    check('password', 'el password no puede estar vacio').not().isEmpty(),
    validarCampos
],login);


module.exports = router;