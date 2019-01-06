<?php
    require "../models/Photo.model.php";
    require "../services/Photo.service.php";
    require "../connector/Connection.php";
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    
    $action = isset($_GET['action']) ? $_GET['action']: null;
	if($action == 'getPhotosByUser' ) {
        $photo= new Photo();
		$photo->__set('user', $_POST['user']);
		$connection = new Connection();
		$service = new PhotoService($connection, $photo);
        $photos=$service->getPhotosByUser();
        echo json_encode($photos);
    } 
    
    $action = isset($_GET['action']) ? $_GET['action']: null;
	if($action == 'getPhotosByUser' ) {
        $photo= new Photo();
		$photo->__set('user', $_POST['user']);
		$connection = new Connection();
		$service = new PhotoService($connection, $photo);
        $photos=$service->getPhotosByUser();
        echo json_encode($photos);
    }   


?>