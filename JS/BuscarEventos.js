/**LISTENERS */
document.getElementById('formModEvento').addEventListener('submit',BuscarEventos);

/**FUNCIONES */
function BuscarEventos(event){
    event.preventDefault();
    let formulario = event. currentTarget;
    let InFechaI = document.getElementById('FechaIni');
    let InFechaF = document.getElementById('FechaFin');

    let fechaI = new Date(InFechaI.value);
    let fechaF = new Date(InFechaF.value);

    //ajustamos valores del dia
    fechaI.setDate(fechaI.getDate()+1);
    fechaF.setDate(fechaF.getDate()+1);

    //Validamos fechas
    if(fechaI<=fechaF){
        RealizarBusquedaEventos(formulario);
    }else{
        alert('Las fecha inicial tiene que ser menor a la fecha final');
    }
    
}

function RealizarBusquedaEventos(formulario){
    let form = formulario;
    var datos = new FormData(form);

    fetch('http://localhost/GCalendario/Services/ConsultarEventos.php',{
                method: 'POST',
                body: datos
            })
            .then(res=>res.json())
            .then(listaEventos=>{

                let cadena = '<tr>'+
                    '<th>Nombre</th>'+
                    '<th>Fecha y hora</th>'+
                    '<th>Estatus</th>'+
                    '<th>Opciones</th>'+
                    '</tr>';

                for(evento of listaEventos){
                    //Configurar fecha para mostrar / configuration to show in table
                    let fecha = evento.start.dateTime;
                    cadena+='<tr>'+
                        '<td>'+evento.summary+'</td>'+
                        '<td class ="FechaTabla"><div>'+fecha.substring(0,10)+'</div><div>'+fecha.substring(11,16)+'</div></td>'+
                        '<td>'+evento.status+'</td>'+
                        '<td class="botones"><div class="eGCalendarCanc" onclick="CanecelarVento(\''+evento.id+'\')">Cancelar</div><div class="eGCalendarMod" onclick="ModificarVento(\''+evento.id+'\')">Modificar</div></td>'+
                        '</tr>';                    
                }
                document.getElementById('TablaEventosGCalendar').innerHTML=cadena;
                

            });
}
