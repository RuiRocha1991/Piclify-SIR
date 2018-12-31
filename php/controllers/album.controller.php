<?php
    require "../models/Albums.model.php";
    require "../services/Album.service.php";
    require "../connector/Connection.php";
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    
    $action = isset($_GET['action']) ? $_GET['action']: null;
	if($action == 'getListAlbums' ) {
        $album= new Album();
        $album->__set('user', $_POST['id_user']);
		$connection = new Connection();
		$service = new AlbumService($connection, $album);
        $album=$service->getAlbumByUser();
        echo json_encode($album);
    }elseif($action=='create'){
        $album= new Album();
        $album->__set('user', $_POST['id_user']);
        $album->__set('description', $_POST['description']);
		$connection = new Connection();
		$service = new AlbumService($connection, $album);
        $service->create();
        $album=$service->getAlbumByUser();
        echo json_encode($album);
    }  
?>