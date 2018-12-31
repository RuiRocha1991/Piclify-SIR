<?php
    require "../models/Photo.model.php";
    require "../services/Photo.service.php";
    require "../connector/Connection.php";
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    
    $action = isset($_GET['action']) ? $_GET['action']: null;
	if($action == 'upload' ) {
        $photo= new Photo();
		
		$connection = new Connection();
		$service = new PhotoService($connection, $photo);
        $service->();
        $photo=$service->();
        echo json_encode($photo);
    }     
?>