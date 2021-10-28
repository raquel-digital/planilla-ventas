const controller = require("./mainController");

var anio = new Date().getFullYear();

var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let mes = new Date().getMonth();
const mesEnCurso = queMes(mes);

function queMes(mes){
    return meses[mes] +"-"+ anio;
}

module.exports = mesEnCurso;