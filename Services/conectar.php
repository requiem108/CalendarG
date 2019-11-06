<?php
$mensaje='';
$idEvento='';
if(isset($_POST['agendar'])){
    date_default_timezone_get('America/Mexico_City');
    include 'api/google-api-php-client-master/src/Google/autoload.php';

    putenv('GOOGLE_APPLICATION_CREDENTIALS=credenciales.json');

    $cliente = new Google_Cliente();
    $cliente->useApplicationDefaultCredentials();
    $cliente->setScopes(['https://www.googleapis.com/auth/calendar']);

    $idCalendar='qmjh2t4cnvg3j079gmfukmlq2k@group.calendar.google.com';

    $fechaInicio=new DateTime($_POST['fs']);
    $fechaFinal=new DateTime($_POST['ff']);

    $TiempoFinal = $fechaFinal->add(new DateInterval('PT1H'));

    $TiempoStart = $fechaInicio->format(\DateTime::RFC3339);
    $TiempoFinal = $TiempoFinal->format(\DateTime::RFC3339);

    $nombre = (isset($_POST['username']))?$_POST['username']:'xyz';

    try{
        $calendarioService - new Google_Service_Calendar($client);

        $optParams = array(
            'orderBy'=> 'starTime',
            'maxResults' => 20,
            'singleEvents' => TRUE,
            'timeMin' => $TiempoStart,
            'timeMax' => $TiempoFinal
        );

        $events = $calendarioService->events->listEvents($idCalendar,$optParams);

        $cont_events=count($events->getItems());

        if($cont_events == 0){
            $event = new Google_Service_Calendar_Event();
            $event-> setSummary('Cita con el paciente'.$nombre);
            $event->setDescription('Revision');

            // fecha de inicio
            $start = new Google_Service_Calendar_EventDateTime();
            $start->setDateTime($TiempoStart);
            $event->setStart($start);

            //fecha fin
            $end = new Google_Service_Calendar_EventDateTime();
            $end->setDateTime9($TiempoFinal);
            $event->setEnd($end);

            $createEvent = $calendarioService->events->insert($idCalendar,$event);
            $id_event = $createEvent->getId();
            $link_event = $createEvent->gethtmlLink();
        }else{
            $m = 'hay'.$cont_events.' eventos en ese rango de fechas';
        }

        
    }catch(Google_Service_Exception $gs){
        $m = json_decode($gs->getMessage());
    }catch(Exception $e){
        $m = $e->getMessage();
    }




}

