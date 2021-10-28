const fs = require('fs');
const { async } = require('rxjs');
const path = `./baseDeDatos`;
const writeXlsxFile = require('write-excel-file/node');
//let date = new Date;
//const fecha = require("./fecha");
//escribir(data, `./baseDeDatos/${date.getDate()+"-"+fecha}.json`);


function moduleIsAvailable (path) {
    try {
        require.resolve(path);
        return true;
    } catch (e) {
        return false;
    }
}

//cargar un JSON chequea si existe y devuelve la informacion 
async function leer(ventas, path) {
    try{    
        let test = moduleIsAvailable(`${path}`);
    
        if(test){
            ventas = require(`${path}`);
            return ventas;
        }else{
            crearJson(ventas, path);
            ventas = require(`${path}`);
            return ventas;
        } 

    }catch(error){
        crearJson(ventas, path);
        ventas = require(`${path}`);
        console.log(`CREANDO ARCHIVO DEL MES ${fecha}`)
        return ventas;
    }
}

function crearJson(data, path){    
    return fs.writeFileSync(path, JSON.stringify(data));        
}

//suma una venta al JSON del mes
function sumarVentas(data, ventas, path){
    if(ventas != undefined){
     let test = ventas.find( e => e.vendedor == data.vendedor)
     console.log(test)
     
    if(test != undefined){
     ventas.map( e => {
     if(e.vendedor == data.vendedor){
         e.monto = e.monto + data.monto;
         console.log("VENDEDOR " + data.vendedor + " SUMO VENTA: " + e.monto);         
         return escribir(ventas, path);                            
        }  
      });
    }else{
     ventas.push(data);
     console.log("NUEVO VENDEDOR")
     return escribir(ventas, path);
        }
    }else{
        ventas = [];
        ventas.push(data);
        console.log("NUEVO VENDEDOR")
        return escribir(ventas, path);
    }
}

//escritura de archivo
async function escribir(data, path){   
    await escribirExcel(data, path);
    return fs.writeFileSync(`${path}.json`, JSON.stringify(data));
}

// const escribirExcel = async (data, path) => await writeXlsxFile(data, {     
//     s,
//     filePath: `${path = path.replace(".json", ".xlsx")}`
// })

async function escribirExcel(data, path){     

    try{

        //path = await path.replace(".json", ".xls");

    var schema = await [
        {
            column: 'vendedor',
            type: String,
            value: data => data.vendedor            
        },
        {
            column: 'monto',
            type: Number,
            value: data => data.monto
        },
        {
            column: 'observaciones',
            type: String,
            value: data => data.observaciones
        },
        {
            column: 'fecha',
            type: String,
            value: data => data.fecha
        }
    ]
  
    await writeXlsxFile(data, {
        schema,
        filePath: `${path}.xls`
    })

    return;
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    escribir,    
    leer, 
    crearJson,
    sumarVentas
};