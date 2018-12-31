<?php
    require "../models/Group_user.model.php";
    require "../services/GroupUser.service.php";
    require "../connector/Connection.php";
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    
    $action = isset($_GET['action']) ? $_GET['action']: null;
	if($action=='create'){
        $group= new Group_user();
        $group->__set('user', $_POST['id_user']);
        $group->__set('group', $_POST['group']);
		$connection = new Connection();
		$service = new GroupService($connection, $group);
        $service->create();
        $group=$service-> getGroupByUser();
        echo json_encode($group);
    }  
?>