<?php 
    require "../models/User.model.php";
    require "../services/User.service.php";
    require "../connector/Connection.php";

    if($_FILES['profile']['error'] !=0){
        //exit('');
        header('Location: ../../design/profile.html?error=Error to upload image');
    }

    if($_FILES['profile']['size'] > 24000000){
        //exit('');
        header('Location: ../../design/profile.html?error=The file is too large');
    }

    if(mime_content_type($_FILES['profile']['tmp_name']) !== 'image/jpeg' && mime_content_type($_FILES['profile']['tmp_name']) !== 'image/png' ){
        //exit('');
        header('Location: ../../design/profile.html?error=It is not image');
    }       

    $basePath = '../../upload/profile/';
    $filePath=$_POST['number'];
    $targetPath=$basePath.$filePath;
    if(file_exists($targetPath)){
        unlink(realpath($targetPath));
    }
    $targetPath=$basePath.$filePath;
    if(!move_uploaded_file($_FILES['profile']['tmp_name'],$targetPath )){
        header('Location: ../../design/profile.html?error=Error to move image');
    }
    $user=new User();
    $user->__set('id_user', $_POST['number']);
    $connection = new Connection();
    $userService = new UserService($connection, $user);
    $userService->upload_new_photo($filePath);
    header('Location: ../../design/profile.html');
?>