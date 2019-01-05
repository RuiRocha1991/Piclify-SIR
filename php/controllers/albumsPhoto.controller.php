<?php
    require "../models/Albums_photo.model.php";
    require "../services/AlbumsPhoto.service.php";
    require "../connector/Connection.php";
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    
    $action = isset($_GET['action']) ? $_GET['action']: null;
	if($action == 'countAlbumsByPhoto' ) {
        $albumsPhoto = new Albums_Photo();
        $albumsPhoto->__set('photo', $_POST['id_photo']);
		$connection = new Connection();
		$service = new AlbumsPhotoService($connection, $albumsPhoto);
        $total=$service->countAlbumsByPhoto();
        echo json_encode($total);
    }     
?>