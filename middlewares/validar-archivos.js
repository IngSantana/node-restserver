


const validarArchivosSubir = (req,res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
       return  res.status(400).json({
           msg: ' No haya archivo que subir - validar archivo Subir'
        });
    }

    next();
}


module.exports = {
    validarArchivosSubir
}