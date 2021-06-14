const { response } = require('express');
const { Categoria } = require('../models');

//obtenerCategorias - paginado - total - populate
const obtenerCategorias = async  (req = request, res = response)  => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'name')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    });
}

//obetenerCategoria - populate {}
const obtenerCategoria = async  (req = request, res = response)  => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'name');

    res.json( categoria);

}

const crearCategoria = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoriaDB = await Categoria.findOne({ name });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.name}, y existe`
        });
    }

    //Generar la data a guardar

    const data = {
        name,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);


    //Guardar en Db
    await categoria.save();

    res.status(201).json(categoria);

}

// atualizarCategoria
const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    
    data.name = data.name.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id,data, {new: true});

    res.json( categoria );
}
const borraCategoria = async (req, res = response) => {
    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, {new: true});
    

    res.json({
        categoriaBorrada,

    });

}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borraCategoria
}