<?php
    require "../models/Like_photo.model.php";
    require "../services/LikesPhoto.service.php";
    require "../connector/Connection.php";
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    
    $action = isset($_GET['action']) ? $_GET['action']: null;
	if($action == 'countLikes' ) {
        $likesPhoto= new Like_photo();
		$likesPhoto->__set('id_photo', $_POST['id_photo']);
		$connection = new Connection();
		$service = new LikesPhotoService($connection, $likesPhoto);
        $total=$service->countLikes();
        echo json_encode($total);
    }elseif($action == 'isLikePhoto' ) {
        $likesPhoto= new Like_photo();
        $likesPhoto->__set('id_photo', $_POST['id_photo']);
        $likesPhoto->__set('id_user', $_POST['id_user']);
		$connection = new Connection();
		$service = new LikesPhotoService($connection, $likesPhoto);
        $likesPhoto=$service->isLikePhoto();
        echo json_encode($likesPhoto);
    }elseif($action == 'addLike' ) {
        $likesPhoto= new Like_photo();
        $likesPhoto->__set('id_photo', $_POST['id_photo']);
        $likesPhoto->__set('id_user', $_POST['id_user']);
		$connection = new Connection();
		$service = new LikesPhotoService($connection, $likesPhoto);
        $service->addLike();
        echo json_encode($likesPhoto);
    }elseif($action == 'removeLike' ) {
        $likesPhoto= new Like_photo();
        $likesPhoto->__set('id_photo', $_POST['id_photo']);
        $likesPhoto->__set('id_user', $_POST['id_user']);
		$connection = new Connection();
		$service = new LikesPhotoService($connection, $likesPhoto);
        $service->removeLike();
        echo json_encode($likesPhoto);
    }     
?>