const mongoose = require('mongoose');
let fecha = require("../utils/fecha");


const schema = mongoose.Schema({
    vendedor: { type: String, require: true, max: 400 },
    monto: { type: Number, require: true, max: 100 },
    observaciones: { type: String, max: 400 },
    fecha: { type: String, require: true, max: 400 }
});

const ventas = mongoose.model(`${fecha}`, schema);

module.exports = ventas;