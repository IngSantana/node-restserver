

const { response } = require('express');
const { subirArchivo } = require('../helpers');

const cargarArchivo = async(req, res = response) => {
    
   
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).senjsond({msg: ' no haya rchivo que subir'});
    return;
  }

  try {
    const name = await subirArchivo(req.files,undefined,'img');
    res.json({
      name
    });

  } catch (msg) {
    res.status(404).json({ msg });
  }



}


module.exports = {
    cargarArchivo
}