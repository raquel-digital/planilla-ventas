
// inicializamos la conexion
const socket = io.connect();
const socketFunction = io.connect() 

var formulario = document.querySelector(".formulario");
var montoVenta = document.querySelector(".ingreso-venta");
var vendedor = document.querySelector(".vendedor");
var observaciones = document.querySelector(".observaciones");
var dropdown =  document.querySelector(".vendedoresDropdown");
var report = document.querySelector(".report");
var global = document.querySelector(".global");


global.addEventListener("click", event => {
    let mouse = event.target;
    if(mouse.classList.contains('venta')){
        let vendedor = mouse.previousElementSibling.previousElementSibling.previousElementSibling;
        let monto = mouse.previousElementSibling;
        ingresarVenta(vendedor.textContent, parseFloat(monto.value))
    }
})

var vendedores = [{vendedor: "elba", totalVentadiaria: 0}, {vendedor: "santiago", totalVentadiaria: 0}, {vendedor: "cristina", totalVentadiaria: 0}, {vendedor: "juan", totalVentadiaria: 0}, {vendedor: "fabian", totalVentadiaria: 0}]

socket.on("ventas-realizadas", ventas => {    
    ventas.forEach(v => {
        report.innerHTML +=  `<tr><td>${v.vendedor}</td><td>${v.monto}</td><td>${v.fecha}</td></tr>`//`<li">fecha: ${v.fecha} vendio: ${v.vendedor} monto: ${v.monto}</li>`
    })
})

socket.on("totalVentas", data => {
    document.querySelector(".totalVentas").innerHTML = `<h1>INGRESO DE VENTAS. TOTAL DE VENTAS DEL DIA: ${data}</h1>`;
})

socket.on("ventaDiaria", ventas => {
    for(venta of ventas){ 
    let suma = document.querySelector("." + venta.vendedor);
        suma.textContent = `${venta.totalVentadiaria}`;
    switch(venta.vendedor){
        case "Elba":
          data.datasets[0].data[0] = venta.totalVentadiaria;
        break;
        case "Santiago":
          data.datasets[0].data[1] = venta.totalVentadiaria;
        break;
        case "Juan":
          data.datasets[0].data[2] = venta.totalVentadiaria;
        break;
        case "Fabian":
          data.datasets[0].data[3] = venta.totalVentadiaria;
        break;
        case "Cristina":
          data.datasets[0].data[4] = venta.totalVentadiaria;
        break;
      }    

    }
    myChart.destroy()
    myChart = new Chart(
      document.getElementById('myChart'),
      config
    );    
})

function ingresarVenta(vendedor, monto){
    let fecha = new Date().toLocaleString();
    let venta = {
        vendedor: vendedor,
        monto: monto,        
        fecha: fecha        
    }
    let confirm = window.confirm(vendedor + " vendio: $ " + monto + " fecha: " + fecha)
    if(confirm){
        report.innerHTML += `<tr><td>${vendedor}</td><td>${monto}</td><td>${fecha}</td></tr>`
        let borrarMonto = document.querySelectorAll(".monto");
        borrarMonto.forEach( m => {
            m.value = " ";
        })
        socket.emit('nueva-venta', venta);
        return;
    }else{
        alert("venta cancelada");
        venta = "";
        return;
    }
}

function cambiarNombre(nombre){     
    return vendedor.textContent = nombre;
}

//check admin
socket.on("admin", () => {
  console.log("amins")
  document.querySelector(".admin").innerHTML = `<span class="col-1"> </span><button><a href="/fileMes">descarga del mes</a></button><span class="col-1"> </span><button><a href="/fileDia">descarga del dia</a></button><hr>`
})

//---BARS GRAPH

const labels = ["Elba", "Santiago", "Juan", "Fabian", "Cristina"];
let data = {
  labels: labels,
  datasets: [{
    label: 'VENTAS DIARIAS',
    data: [0, 0, 0, 0, 0],
    backgroundColor: [
      'rgba(251, 244, 212, 0.2)',
      'rgba(241, 58, 119, 0.2)',
      'rgba(60, 109, 243, 0.2)',
      'rgba(60, 243, 203, 0.2)',
      'rgba(255, 192, 245, 0.2)'
    ],
    borderColor: [
      'rgb(251, 244, 212)',
      'rgb(241, 58, 119)',
      'rgb(60, 109, 243)',
      'rgb(60, 243, 203)',
      'rgb(55, 192, 245)'
    ],
    borderWidth: 1
  }]
};
let config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};
var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );



