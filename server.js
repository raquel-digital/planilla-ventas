const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//conectamos mongoDB
require('./conecciones/mongoCompas');
//CRUD
// const mongo = require("./api/mongo");
 let mongoCRUD = require("./api/mongo");

//UTILS
let fecha = require("./utils/fecha");
let controller = require("./utils/mainController");
let pathLectura = `../baseDeDatos/${fecha}.json`;
//DOTENV
const dotenv = require('dotenv').config();
 
var data = []; //array de ventas GLOBAL
var ventaDiaria = [];// array de ventas dia a dia

(async () => {
    try{
        data = await mongoCRUD.leer(data, "mensual");
        
        if(data == null)
        data = await controller.leer(data, `${pathLectura}`);
        let date =  new Date;
        ventaDiaria = await mongoCRUD.leer(ventaDiaria, "diaria");
        
        if(ventaDiaria == null)        
        ventaDiaria = await controller.leer(ventaDiaria, `../baseDeDatos/${date.getDate()+"-"+fecha}.json`);
    }catch(err){
        console.log(`BASE DE DATOS NO ENCONTRADA. CREANDO BASE DE DATOS FECHA:  ${fecha}`);
        data = await controller.crearJson(data, `./baseDeDatos/${fecha}.json`);
        data = await controller.leer(data, `${pathLectura}`);
        let date =  new Date;
        ventaDiaria = await controller.crearJson(ventaDiaria, `./baseDeDatos/${date.getDate()+"-"+fecha}.json`);        
        ventaDiaria = await controller.leer(ventaDiaria, `../baseDeDatos/${date.getDate()+"-"+fecha}.json`);
    }
    
})()

//Iniciamos Web Socket
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;

//HandleBars
const handlebars = require('express-handlebars');
const { json } = require('express');
const { async } = require('rxjs');
app.engine('hbs', handlebars({
    extname: '.hbs',//extension
    defaultLayout: 'index.hbs',//pagina por defecto
    layoutsDir: __dirname + '/views/layouts',//dir layouts
    partialsDir: __dirname + '/views/partials/'//dir partials
}));

//seteo el motor de plantilla
app.set('view engine', 'hbs');
app.set('views', './views');
//Carpeta public
app.use(express.static('./public'));

//RUTA
app.get('/', async (req, res) => {
    res.render('main');
});

//WEBSOCKET
io.on('connect', socket => {
    console.log('nueva conexion');
    if(data != null){        
        socket.emit("ventas-realizadas", ventaDiaria)
    }
    
       
    socket.on('nueva-venta', async nuevaVenta => {
        console.log(ventaDiaria)        
        nuevaVenta.monto = parseFloat(nuevaVenta.monto);               
        ventaDiaria.push(nuevaVenta);
        let date =  new Date;        
        controller.escribir(ventaDiaria, `./baseDeDatos/${date.getDate()+"-"+fecha}`);
        await mongoCRUD.guardar(nuevaVenta, "diario"); 
        let result = await controller.sumarVentas(nuevaVenta, data, `./baseDeDatos/${fecha}`, "mensual");
        console.log("DESDE SERVER "+result)
        await mongoCRUD.sumarVenta(result)        
    });
})





// const escribirExcel = async () => await writeXlsxFile(ventas, {
//     schema,
//     filePath: `./baseDeDatos/ventas-mayorista-${fecha}.xlsx`
// })

http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});
// en caso de error, avisar
http.on('error', error => {
    console.log('error en el servidor:', error);
});