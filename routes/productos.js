const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borraProducto } = require('../controllers/productos');

const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validatos');

const router = Router();

/**
 * {{url}}/api/productos
 */

//obtener todas los Productos - publicio
router.get('/', [obtenerProductos], (req, res) => res.json('GET'));

//Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);


//crear Producto - privado - cualquier usuario con token valido
router.post('/', [
    validarJWT,
    check('name', 'El nombre del producto debe ser obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos],
    crearProducto
);

//Actualizar - privado - cualquiera con token valido 
router.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

//Borrar un producto -Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borraProducto);





module.exports = router;