<?php
    require "../models/User.model.php";
    require "../services/User.service.php";
    require "../connector/Connection.php";
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    
    $action = isset($_GET['action']) ? $_GET['action']: null;
	if($action == 'create' ) {
		$user = new User();
        $user->__set('name', $_POST['name']);
        $user->__set('email', $_POST['email']);
        $user->__set('password', $_POST['password']);
        $user->__set('genre', $_POST['genre']);
        $user->__set('locality', $_POST['locality']);
        $user->__set('country', $_POST['country']);
        $user->__set('birth_date', $_POST['birth_date']);
        $user->__set('is_validate', false);
        $user->__set('is_active', true);
		$connection = new Connection();
		$userService = new UserService($connection, $user);
        $userService->create();
        $user=$userService->getNewUser();
        echo json_encode($user);
    } else if($action=='getUserByEmail'){
        $user = new User();
        $user->__set('email', $_POST['email']);
        $connection = new Connection();
        $userService = new UserService($connection, $user);
        $user=$userService->getNewUser();
        echo json_encode($user);
    }else if($action=='getNumberFollowers'){
        $user = new User();
        $user->__set('id_user', $_POST['id_user']);
        $connection = new Connection();
        $userService = new UserService($connection, $user);
        $user=$userService->getNumberFollowers();
        echo json_encode($user);
    }else if($action=='login'){
        $user = new User();
        $user->__set('email', $_POST['email']);
        $user->__set('password', $_POST['password']);
        $connection = new Connection();
        $userService = new UserService($connection, $user);
        $user=$userService->login();
        echo json_encode($user);
    }elseif($action=='getDetailsUserById'){
        $user = new User();
        $user->__set('id_user', $_POST['id_user']);
        $connection = new Connection();
        $userService = new UserService($connection, $user);
        $user=$userService->getDetailsUserById();
        echo json_encode($user);
    }elseif($action=='getUserByNameEmailCountryLocality'){
        $user = new User();
        $user->__set('name', $_POST['name']);
        $user->__set('email', $_POST['email']);
        $user->__set('locality', $_POST['locality']);
        $user->__set('country', $_POST['country']);
        $connection = new Connection();
        $userService = new UserService($connection, $user);
        $user=$userService->getUserByNameEmailCountryLocality();
        echo json_encode($user);
    }
    
?>