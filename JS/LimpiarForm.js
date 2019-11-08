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
            } 

        } 
     } 
}