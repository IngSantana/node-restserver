const express = require('express')
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app =  express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conectar a base de datos
        this.conectarDB();
        //middlewares
        this.middlewares();

        //rutas de mi aplicacion.
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //lectura y parseo de body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }
     routes() {
    
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port,() => {
            console.log('servidor corriendo en puerto',this.port);
        })
    }

}

module.exports = Server;