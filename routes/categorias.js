const { Router } = require('express');
const { check }  = require('express-validator');

const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria,
        borraCategoria
 } = require('../controllers/categorias');
const { existeCategoriaPorID, existeCategoriaPorId } = require('../helpers/db-validatos');

const { validarJWT, esAdminRole }    = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//obtener todas las categorias - publicio
router.get('/', [obtenerCategorias], (req, res) => res.json('GET'));

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], obtenerCategoria);

//crear categoria - privado - cualquier usuario con token valido
router.post('/', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar - privado - cualquiera con token valido 
router.put('/:id', [
    validarJWT,
    check('name', 'el nombre no puede estar vacio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

//Borrar una categoria -Admin
router.delete('/:id',[
    validarJWT, 
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borraCategoria);


module.exports = router;