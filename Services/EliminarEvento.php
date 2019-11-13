<?php
header('Access-Control-Allow-Origin: *');

$idEvento = $_POST['idEvento'];

//Preparando informacion para uso de la API
//Prepare info to use api
require_once '../google-api-php-client-2.4.0/vendor/autoload.php';

//configurar variable de entorno / set enviroment variable
putenv('GOOGLE_APPLICATION_CREDENTIALS=credenciales.json');

$cliente = new Google_Client();
$cliente->useApplicationDefaultCredentials();
$cliente->setScopes(['https://www.googleapis.com/auth/calendar']);

//define id calendario / add id calendar
$id_calendar='qmjh2t4cnvg3j079gmfukmlq2k@group.calendar.google.com';

$calendarService = new Google_Service_Calendar($cliente);

$calendarService->events->delete($id_calendar,$idEvento);

echo 'Evento eliminado';

?>