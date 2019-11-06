//formato fecha / Date format
var forFecha=document.querySelectorAll(".inputFechas");
forFecha.forEach(function(objt){
    
     FechaDefault(objt);
    
});

// Asigna la fecha del dia actual a todos los elementos con clase fecha------------------
//take date to day for all inputs with the class name .inputFechas 
function FechaDefault(objt){
    var fecha = new Date(); //Fecha actual
var mes = fecha.getMonth()+1; //obteniendo mes
var dia = fecha.getDate(); //obteniendo dia
var ano = fecha.getFullYear(); //obteniendo año
if(dia<10)
dia='0'+dia; //agrega cero si el menor de 10
if(mes<10)
mes='0'+mes; //agrega cero si el menor de 10 
objt.value=ano+"-"+mes+"-"+dia;
   
}