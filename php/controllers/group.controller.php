<?php
    require "../models/Photo_group.model.php";
    require "../services/Group.service.php";
    require "../connector/Connection.php";
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    
    $action = isset($_GET['action']) ? $_GET['action']: null;
	if($action=='create'){
        $group= new Group_photo();
        $group->__set('owner', $_POST['owner']);
        $group->__set('description', $_POST['description']);
        $group->__set('title', $_POST['title']);
		$connection = new Connection();
		$service = new GroupService($connection, $group);
        $service->create();
        $group=$service->getGroupByOwnerTitleDescription();
        echo json_encode($group);
    } elseif($action=='getListGroupById'){
        $group= new Group_photo();
        $group->__set('id_group', $_POST['id_group']);
		$connection = new Connection();
		$service = new GroupService($connection, $group);
        $group=$service->getGroupByID();
        echo json_encode($group);
    }elseif($action=='getGroupByTitleOrDescription'){
        $group= new Group_photo();
        $group->__set('title', $_POST['title']);
        $group->__set('description', $_POST['description']);
		$connection = new Connection();
		$service = new GroupService($connection, $group);
        $groups=$service->getGroupByTitleOrDescription();
        echo json_encode($groups);
    }
?>