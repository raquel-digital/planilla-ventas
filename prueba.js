
let coleccion = {
    queColeccion: (coleccion) => {
        const col = require(`./models/${coleccion}`);

        console.log(col)
    }
}

coleccion.queColeccion("ventaDiarias")
coleccion.queColeccion("ventasMensual")
module.exports = coleccion;





