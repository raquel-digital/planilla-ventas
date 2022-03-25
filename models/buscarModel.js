const mongoose = require('mongoose');

const schema = mongoose.Schema({
    suma: {type: String, max: 400},
    totalVentadiaria: { type: Number, max: 100000000000000 }
});

async function buscarColeccion(coleccion) {
    const ventas = mongoose.model(`Total-dia: ${coleccion}`, schema);
    try{
        const find = await ventas.find();
        return find;
    }catch(err){
      return console.log("BASE DE DATOS NO ENCONTRADA " + err)
    }
} 

module.exports = buscarColeccion;
