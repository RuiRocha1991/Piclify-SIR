<?php 
    require "../models/User.model.php";
    require "../services/User.service.php";
    require "../connector/Connection.php";

    if($_FILES['profile']['error'] !=0){
        //exit('Error to upload image');
        header('Location: ../../design/profile.html');
    }

    if($_FILES['profile']['size'] > 24000000){
        //exit('The file is too large');
        header('Location: ../../design/profile.html');
    }

    if(mime_content_type($_FILES['profile']['tmp_name']) !== 'image/jpeg' && mime_content_type($_FILES['profile']['tmp_name']) !== 'image/png' ){
        //exit('It is not image');
        header('Location: ../../design/profile.html');
    }       

    $basePath = '../../upload/profile/';
    $filePath=$_POST['number'];
    $targetPath=$basePath.$filePath;
    if(file_exists($targetPath)){
        unlink(realpath($targetPath));
    }
    $targetPath=$basePath.$filePath;
    if(!move_uploaded_file($_FILES['profile']['tmp_name'],$targetPath )){
        //exit('Error to upload image');
        header('Location: ../../design/profile.html');
    }
    $user=new User();
    $user->__set('id_user', $_POST['number']);
    $connection = new Connection();
    $userService = new UserService($connection, $user);
    $userService->upload_photo_profile($filePath);
    header('Location: ../../design/profile.html');
?>