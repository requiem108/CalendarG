/**LISTENERS */
document.querySelector('.cerrarMod').addEventListener('click',()=>{
    let modal = document.getElementById('modalEvento');
    modal.classList.add('OFF')
})

document.getElementById('fModEvento').addEventListener('submit',(event)=>{
    let form = document.getElementById('formModEvento');

    Modificar(event)
        .then(()=>{
            RealizarBusquedaEventos(form);
        });
});

/**FUNCIONES */

/**Muestra pantalla modal y carga los valores del evento
 * show modal in screen and load values of the event
 */
function ModificarEvento(idEvento,fecha,horario){
    let modal = document.getElementById('modalEvento');
    document.getElementById('idEvento').innerHTML=idEvento;

    document.getElementById('ModHoraSelect').value=horario;
    document.getElementById('ModFechaEvento').value=fecha;
    modal.classList.remove('OFF')
}

/**Manda los datos del formulario para cabiar el evento
 * send data form to change the event
 */
function Modificar(event){

    return new Promise((resolve,reject)=>{
        event.preventDefault();
        let formulario= event.currentTarget;
        let idEvento = document.getElementById('idEvento').innerHTML;
    
        var datos= new FormData(formulario);
        datos.append('idEvento',idEvento);
    
        fetch(direccionURL+'ModificarEvento.php',{
                    method: 'POST',
                    body: datos
                })
                .then(res=>res.text())
                .then(respuesta=>{
                    console.log(respuesta);
                    if(respuesta=='exito'){
                        alert('Cita Modificada correctamente');                   
                        
                        let modal = document.getElementById('modalEvento');
                        modal.classList.add('OFF');
    
                        document.getElementById('MyIframe').src+='';
                        resolve();
                    }else{
                        alert(respuesta);
                        reject();
                    }
                });
    })
    
}