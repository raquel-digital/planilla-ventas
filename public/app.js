// inicializamos la conexion
const socket = io.connect(); 

var formulario = document.querySelector(".formulario");
var montoVenta = document.querySelector(".ingreso-venta");
var vendedor = document.querySelector(".vendedor");
var observaciones = document.querySelector(".observaciones");
var dropdown =  document.querySelector(".vendedoresDropdown");
var report = document.querySelector(".report");
var vendedores = ["Alejandro", "Eric", "Graciela", "Karina", "Oscar"];

vendedores.forEach( v => {    
    dropdown.innerHTML += `<li class="${v} dropdown-item" onclick="cambiarNombre('${v}')">${v}</li>`
})

socket.on("ventas-realizadas", ventas => {    
    ventas.forEach(v => {
        report.innerHTML +=  `<tr><td>${v.vendedor}</td><td>${v.monto}</td><td>${v.observaciones}</td><td>${v.fecha}</td></tr>`//`<li">fecha: ${v.fecha} vendio: ${v.vendedor} monto: ${v.monto}</li>`
    })    
}) 

function ingresarVenta(){
    
    let fecha = new Date().toLocaleString()    
    console.log(vendedor.textContent + " vendio: $ " + montoVenta.value + "fecha: " + fecha)
    
   let venta = {
        vendedor: vendedor.textContent,
        monto: montoVenta.value,
        observaciones: observaciones.value,
        fecha: fecha
    }
    if(venta.monto == "" || venta.vendedor == "Vendedor"){
        alert("Se deben completar todos los campos");        
        return;
    }
    console.log(venta)
    //report.innerHTML += `<li>fecha: ${fecha} vendio: ${vendedor.textContent} monto: ${montoVenta.value}</li>`
    report.innerHTML += `<tr><td>${vendedor.textContent}</td><td>${montoVenta.value}</td><td>${observaciones.value}</td><td>${fecha}</td></tr>`
    socket.emit('nueva-venta', venta);

    alert(vendedor.textContent + " vendio: $ " + montoVenta.value + " fecha: " + fecha)
}

function cambiarNombre(nombre){     
    return vendedor.textContent = nombre;
}



