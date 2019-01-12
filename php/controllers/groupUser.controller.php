<?php
    require "../models/User_group.model.php";
    require "../services/GroupUser.service.php";
    require "../connector/Connection.php";
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    
    $action = isset($_GET['action']) ? $_GET['action']: null;
	if($action=='create'){
        $groupUser= new User_group();
        $groupUser->__set('user',$_POST['user']);
        $groupUser->__set('group', $_POST['group']);
		$connection = new Connection();
		$service = new GroupUserService($connection, $groupUser);
        $service->create();
        $groupUser=$service-> getGroupsByUser();
        echo json_encode($groupUser);
    }elseif($action=='delete'){
        $groupUser= new User_group();
        $groupUser->__set('user',$_POST['user']);
        $groupUser->__set('group', $_POST['group']);
		$connection = new Connection();
		$service = new GroupUserService($connection, $groupUser);
        $service->delete();
        echo json_encode($groupUser);
    }elseif($action=='getListGroupsByUser'){
        $groupUser= new User_group();
        $groupUser->__set('user',$_POST['user']);
		$connection = new Connection();
		$service = new GroupUserService($connection, $groupUser);
        $groupUser=$service-> getGroupsByUser();
        echo json_encode($groupUser);
    }elseif($action=='getListUsersByGroup'){
        $groupUser= new User_group();
        $groupUser->__set('group',$_POST['group']);
		$connection = new Connection();
		$service = new GroupUserService($connection, $groupUser);
        $groupUser=$service-> getListUsersByGroup();
        echo json_encode($groupUser);
    }elseif($action=='verifyIsJoinGroup'){
        $groupUser= new User_group();
        $groupUser->__set('user',$_POST['user']);
        $groupUser->__set('group', $_POST['id_group']);
		$connection = new Connection();
		$service = new GroupUserService($connection, $groupUser);
        $groupUser=$service-> verifyIsJoinGroup();
        echo json_encode($groupUser);
    }
?>