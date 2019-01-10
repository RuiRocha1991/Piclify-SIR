<?php
    require "../models/Comment.model.php";
    require "../services/CommentsPhoto.service.php";
    require "../connector/Connection.php";
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    
    $action = isset($_GET['action']) ? $_GET['action']: null;
	if($action == 'countComments' ) {
        $commentsPhoto= new Comment();
		$commentsPhoto->__set('photo', $_POST['id_photo']);
		$connection = new Connection();
		$service = new CommentsPhotoService($connection, $commentsPhoto);
        $total=$service->countComments();
        echo json_encode($total);
    }if($action == 'addComment' ) {
        $commentsPhoto= new Comment();
        $commentsPhoto->__set('photo', $_POST['id_photo']);
        $commentsPhoto->__set('user', $_POST['id_user']);
        $commentsPhoto->__set('text', $_POST['text']);
		$connection = new Connection();
		$service = new CommentsPhotoService($connection, $commentsPhoto);
        $service->addComment();
        echo json_encode($commentsPhoto);
    }     
?>