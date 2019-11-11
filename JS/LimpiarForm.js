function LimpiarFormularioPrincipal(objt){
    var listaHijos=objt.children;
     for(hijo of listaHijos){
        var listaObjt=hijo.children;

        for(objt of listaObjt){
            
            if(objt.type=="text" || objt.type=="number" 
                || objt.type=="password" || objt.type=="email"){
            objt.value=""
            }else if(objt.type=="select"){
                objt.value=0;
            }else if(objt.type=="select-one") {
                objt.value=0;
            }else if(objt.type == 'date'){
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

        } 
     } 
}