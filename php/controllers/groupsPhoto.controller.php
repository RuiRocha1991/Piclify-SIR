<?php
    require "../models/Group_photo_relations.model.php";
    require "../services/GroupsPhoto.service.php";
    require "../connector/Connection.php";
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    
    $action = isset($_GET['action']) ? $_GET['action']: null;
	if($action == 'countGroupsByPhoto' ) {
        $groupsPhoto = new Group_photo_relations();
        $groupsPhoto->__set('photo', $_POST['id_photo']);
		$connection = new Connection();
		$service = new GroupsPhotoService($connection, $groupsPhoto);
        $total=$service->countGroupsByPhoto();
        echo json_encode($total);
    } elseif($action == 'getGroupsByPhoto' ) {
        $groupsPhoto= new Group_photo_relations();
        $groupsPhoto->__set('photo', $_POST['id_photo']);
		$connection = new Connection();
		$service = new GroupsPhotoService($connection, $groupsPhoto);
        $groupsPhoto=$service->getGroupsByPhoto();
        echo json_encode($groupsPhoto);
    }elseif($action == 'addPhotoInGroup' ) {
        $groupsPhoto= new Group_photo_relations();
        $groupsPhoto->__set('photo', $_POST['id_photo']);
        $groupsPhoto->__set('group', $_POST['id_group']);
		$connection = new Connection();
		$service = new GroupsPhotoService($connection, $groupsPhoto);
        $service->addPhotoInGroup();
        echo json_encode($groupsPhoto);
    } elseif($action == 'removeGroupOfPhoto' ) {
        $groupsPhoto= new Group_photo_relations();
        $groupsPhoto->__set('photo', $_POST['id_photo']);
        $groupsPhoto->__set('group', $_POST['id_group']);
		$connection = new Connection();
		$service = new GroupsPhotoService($connection, $groupsPhoto);
        $service->removeGroupOfPhoto();
        echo json_encode($groupsPhoto);
    }     
?>