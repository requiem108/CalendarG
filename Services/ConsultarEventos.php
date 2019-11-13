<?php
header('Access-Control-Allow-Origin: *');
$fechaI = $_POST['FechaI'];
$fechaF = $_POST['FechaF'];

//Prepare info to use api 

require_once '../google-api-php-client-2.4.0/vendor/autoload.php';

// set enviroment variable /configurar variable de entorno
putenv('GOOGLE_APPLICATION_CREDENTIALS=credenciales.json');

$cliente = new Google_Client();
$cliente->useApplicationDefaultCredentials();
$cliente->setScopes(['https://www.googleapis.com/auth/calendar']);


//time zone / zona horaria
date_default_timezone_set('America/Mexico_City');
//define id calendario / add id calendar
$id_calendar='qmjh2t4cnvg3j079gmfukmlq2k@group.calendar.google.com';

//organize time format / organizando el formato de tiempo
 $fechaI = $fechaI.'T00:00:00';
 $fechaF = $fechaF.'T23:59:00';

 $datetime_start = new DateTime($fechaI);
 $datetime_end = new DateTime($fechaF);

 $time_start =$datetime_start->format(\DateTime::RFC3339);
 $time_end=$datetime_end->format(\DateTime::RFC3339);

 try{
    $calendarService = new Google_Service_Calendar($cliente);

    $optParams = array(
        'orderBy' => 'startTime',
        'maxResults' => 20,
        'singleEvents' => TRUE,
        'timeMin' => $time_start,
        'timeMax' => $time_end,
    );

    $events=$calendarService->events->listEvents($id_calendar,$optParams);

    echo json_encode($events->getItems());

 }catch(Google_Service_Exception $gs){
     
      
      echo $gs->getMessage();

    }catch(Exception $e){
       
       echo $e->getMessage();
    }
?>