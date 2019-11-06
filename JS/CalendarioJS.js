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
}

function AgregarEvento(event){
    event.preventDefault();
    let formulario=event.currentTarget;
    //Validacion / Validate
    let nomDoct = document.getElementById('nombreSelect');
    let fechaE = document.getElementById('FechaEvento');
    let hora = document.getElementById('HoraSelect');

    let fecha = new Date();
    let fechaComparar = new Date(fechaE.value);
    fechaComparar.setDate(fechaComparar.getDate()+1);

    if(fecha<fechaComparar){
        if(nomDoct.value!=0 && hora.value!=0){
            var datos= new FormData(formulario);
            fetch('http://localhost/GCalendario/Services/CrearEvento.php',{
                method: 'POST',
                body: datos
            })
            .then(res=>res.text())    
            //Mostrar los resultados
            .then(cortes=>{
                document.getElementById('MyIframe').contentDocument.location.reload(true);
            })
        }else{
            alert('Revisa tus opciones seleccionadas');
        }
    }else{
        alert('La fecha de la cita tiene que ser posterior al dia de hoy')
    }
}
