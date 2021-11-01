const mongoose = require('mongoose');
let fecha = require("../utils/fecha");
let date =  new Date; 

const schema = mongoose.Schema({
    vendedor: { type: String, require: true, max: 400 },
    monto: { type: String, require: true, max: 100 },
    observaciones: { type: String, max: 400 },
    fecha: { type: String, require: true, max: 400 }
});

const ventas = mongoose.model(`${date.getDate()+"-"+fecha}`, schema);

module.exports = ventas;