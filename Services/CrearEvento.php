<?php
header('Access-Control-Allow-Origin: *');
$NombreDoctor=$_POST['NombreDoctor'];
$FechaEvento=$_POST['FechaEvento'];
$HoraEvento=$_POST['HoraEvento'];
$invitado='';

//echo $NombreDoctor.$FechaEvento.$HoraEvento;

//Carga el correo del doctor / Simulacion de una BD
//load mail of doctor / simulate BD 

$invitados[1]='Omar@test.com';
$invitados[2]='Ariadna@test.com';

//Se obtiene el correo del doctor
// get mail of doctor
$invitado=$invitados[$NombreDoctor];

//echo $invitado;

//Preparando informacion para uso de la API
//Prepare info to use api

date_default_timezone_get('America/Mexico_City');
require_once 'google-api-php-client-2.4.0/vendor/autoload.php';

//configurar variable de entorno / set enviroment variable
putenv('GOOGLE_APPLICATION_CREDENTIALS=credenciales.json');

$cliente = new Google_Cliente();
$cliente->useApplicationDefaultCredentials();
$cliente->setScopes(['https://www.googleapis.com/auth/calendar']);

 //id del calendario / define id calendario
 $id_calendar='qmjh2t4cnvg3j079gmfukmlq2k@group.calendar.google.com';
echo "exito";

?>