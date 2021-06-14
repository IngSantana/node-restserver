const { response } = require('express');
const { Producto } = require('../models');


//obtenerProductos - paginado - total - populate
const obtenerProductos = async  (req = request, res = response)  => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'name')
            .populate('categoria', 'name')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos: productos
    });
}

//obetenerProducto - populate 
const obtenerProducto = async  (req = request, res = response)  => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
                    .populate('usuario', 'name')
                    .populate('categoria', 'name');

    res.json( producto);

}

const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ name: body.name });

    if (productoDB) {
        return res.status(400).json({
            msg: `El Producto ${productoDB.name}, ya existe`
        });
    }

    //Generar la data a guardar

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);


    //Guardar en Db
    await producto.save();

    res.status(201).json(producto);

}

// atualizarProducto
const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    
    if (data.name) {
    data.name = data.name.toUpperCase();
    }

    data.usuario = req.usuario._id;
    
    const producto = await Producto.findByIdAndUpdate(id,data, {new: true});

    res.json( producto );
}

//Borrar Producto
const borraProducto = async (req, res = response) => {
    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, {new: true});
    

    res.json({
        productoBorrado,

    });

}




module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borraProducto
}