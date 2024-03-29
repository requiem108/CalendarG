/**LISTENERS */
//Cargar Horarios
window.addEventListener('load',CargarHorarios);

//Agregar evento
document.getElementById('formCrearEvento').addEventListener('submit',AgregarEvento);


/*FUNCIONES------------------------------- */
function CargarHorarios(){
    let hora=10;
    let minutos=false;
    let cadena='';
    let renglon='<option value=0>Horario..</option>';
    

    for(var i =0; hora<19;i++){
        if(minutos){
            cadena=hora+':30';
            hora++;
            minutos=false;
        }else{
            cadena=hora+':00';            
            minutos=true;
        }
        renglon+='<option value='+cadena+'>'+cadena+'</option>';
    }
    renglon+='<option value="19:00">19:00</option>';
    document.getElementById('HoraSelect').innerHTML=renglon;
    document.getElementById('ModHoraSelect').innerHTML=renglon;
}

function AgregarEvento(event){
    event.preventDefault();
    let formulario=event.currentTarget;
    //Validacion / Validate
    let nomDoct = document.getElementById('nombreSelect');
    let fechaE = document.getElementById('FechaEvento');
    let hora = document.getElementById('HoraSelect');

    let fecha = new Date();
    fecha.setHours(0);
    let fechaComparar = new Date(fechaE.value);
    fechaComparar.setDate(fechaComparar.getDate()+1);

    if(fecha<fechaComparar){
        if(nomDoct.value!=0 && hora.value!=0){
            var datos= new FormData(formulario);
            fetch(direccionURL+'CrearEvento.php',{
                method: 'POST',
                body: datos
            })
            .then(res=>res.text())
            .then(respuesta=>{
                console.log(respuesta);
                if(respuesta=='exito'){
                    alert('Cita agregada correctamente');
                    LimpiarFormularioPrincipal(formulario);
                    document.getElementById('MyIframe').src+='';
                    document.getElementById('TablaEventosGCalendar').innerHTML='';
                }else{
                    alert(respuesta);
                }
                //document.getElementById('MyIframe').contentDocument.location.reload(true);
            })
        }else{
            alert('Revisa tus opciones seleccionadas');
        }
    }else{
        alert('La fecha de la cita tiene que ser posterior al dia de hoy')
    }
}
