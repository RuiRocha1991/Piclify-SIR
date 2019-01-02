<?php
    require '../models/Followers.model.php';
    require '../services/Follower.service.php';
    require '../connector/Connection.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

    $action = isset($_GET['action']) ? $_GET['action']: null;

    if($action == 'addFollower'){
        $follower = new Follower();
        $follower->__set('id_user', $_POST['id_user']);
        $follower->__set('id_follower', $_POST['id_follower']);
        $connection = new Connection();
        $service = new FollowerService($connection, $follower);
        $service->addFollolwer();
    }elseif($action == 'verifyFollower'){
        $follower = new Follower();
        $follower->__set('id_user',$_POST['id_user']);
        $follower->__set('id_follower', $_POST['id_follower']);
        $connection = new Connection();
        $service = new FollowerService($connection, $follower);
        echo json_encode($service->verifyFollower() );
    }elseif($action == 'removeFollower'){
        $follower = new Follower();
        $follower->__set('id_user',$_POST['id_user']);
        $follower->__set('id_follower', $_POST['id_follower']);
        $connection= new Connection();
        $service = new FollowerService($connection, $follower);
        $service->removeFollower();
    }
?>