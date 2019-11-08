<?php
header('Access-Control-Allow-Origin: *');
$NombreDoctor=$_POST['NombreDoctor'];
$FechaEvento=$_POST['FechaEvento'];
$HoraEvento=$_POST['HoraEvento'];





//Carga el correo del doctor / Simulacion de una BD
//load mail of doctor / simulate BD 

$invitados[1]='Omar@test.com';
$invitados[2]='Ariadna@test.com';

//Se obtiene el correo del doctor
// get mail of doctor
$invitado=$invitados[$NombreDoctor];

//Preparando informacion para uso de la API
//Prepare info to use api
date_default_timezone_set('America/Mexico_City');

require_once '../google-api-php-client-2.4.0/vendor/autoload.php';

//configurar variable de entorno / set enviroment variable
putenv('GOOGLE_APPLICATION_CREDENTIALS=credenciales.json');

$cliente = new Google_Client();
$cliente->useApplicationDefaultCredentials();
$cliente->setScopes(['https://www.googleapis.com/auth/calendar']);

//define id calendario / add id calendar
$id_calendar='qmjh2t4cnvg3j079gmfukmlq2k@group.calendar.google.com';

//definir el horario de inicio /  define schedule to start
$fecha=$FechaEvento.'T'.$HoraEvento;


$datetime_start = new DateTime($fecha);
$datetime_end = new DateTime($fecha);


$time_end = $datetime_end->add(new DateInterval('PT30M'));

//datetime must be format RFC3339
$time_start =$datetime_start->format(\DateTime::RFC3339);
$time_end=$time_end->format(\DateTime::RFC3339);
//echo $time_start."--".$time_end;


try{
    $calendarService = new Google_Service_Calendar($cliente);

    $optParams = array(
        'orderBy' => 'startTime',
        'maxResults' => 20,
        'singleEvents' => TRUE,
        'timeMin' => $time_start,
        'timeMax' => $time_end,
    );

    //obtener eventos 
    $events=$calendarService->events->listEvents($id_calendar,$optParams);

    $cont_events=count($events->getItems());

    if($cont_events == 0){

        $event = new Google_Service_Calendar_Event();
        $event->setSummary('Cita para el Doctor '.$NombreDoctor);
        $event->setDescription('Revisión por parete del doctor');
        $event->setLocation('Sucursal Gto 1');
     

        //fecha inicio
        $start = new Google_Service_Calendar_EventDateTime();
        $start->setDateTime($time_start);
        $event->setStart($start);

        //fecha fin
        $end = new Google_Service_Calendar_EventDateTime();
        $end->setDateTime($time_end);
        $event->setEnd($end);

      
        $createdEvent = $calendarService->events->insert($id_calendar, $event);
        $id_event= $createdEvent->getId();
        $link_event= $createdEvent->gethtmlLink();

        //Return ID Event
        $events=$calendarService->events->listEvents($id_calendar,$optParams);

        
        echo "exito".$events;
    }else{
        
        echo 'Existe un evento ya agendado';
    }

}catch(Google_Service_Exception $gs){
     
      $m = json_decode($gs->getMessage());
      $m= $m->error->message;
      echo $m;

    }catch(Exception $e){
        $m = $e->getMessage();
        echo $m;
    }
    
 

?>