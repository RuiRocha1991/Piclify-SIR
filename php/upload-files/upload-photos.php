<?php 
    require "../models/Photo.model.php";
    require "../services/Photo.service.php";
    require "../connector/Connection.php";

    if(empty($_POST["description"]) || empty($_POST["name"]) || empty($_FILES["photos"]["name"]) ){
        header('Location: ../../design/profile.html?error=You need to fill all fields');
        exit('erro');
    }
  
    if($_FILES['photos']['error'] !=0){
        //exit('');
        header('Location: ../../design/profile.html?error=Error to upload image');
        exit('erro');
    }

    if($_FILES['photos']['size'] > 24000000){
        //exit('');
        header('Location: ../../design/profile.html?error=The file is too large');
        exit('erro');
    }

    if(mime_content_type($_FILES['photos']['tmp_name']) !== 'image/jpeg' && mime_content_type($_FILES['photos']['tmp_name']) !== 'image/png' ){
        //exit('');
        header('Location: ../../design/profile.html?error=It is not image');
        exit('erro');
    }  
    
    if (!file_exists('../../upload/userPhotos/'.$_POST['number'])) {
        mkdir('../../upload/userPhotos/'.$_POST['number'], 0777, true);
    } 

    $numRandom = rand(0, 1000000);

    $basePath = '../../upload/userPhotos/'.$_POST['number'].'/';
    $filePath=str_replace(' ','',$_POST['name']).$numRandom;
    $targetPath=$basePath.$filePath;
    while(file_exists($targetPath)){
        $numRamdom = rand(0, 1000000);
        $filePath=str_replace(' ','',$_POST['name']).$numRandom;
        $targetPath=$basePath.$filePath;
    }
    if(!move_uploaded_file($_FILES['photos']['tmp_name'],$targetPath )){
        header('Location: ../../design/profile.html?error=Error to move image');
        exit('erro');
    }
    $photo=new Photo();
    $photo->__set('user', $_POST['number']);
    $photo->__set('path',$filePath);
    $photo->__set('name', $_POST['name']);
    $photo->__set('is_private', $_POST['isPrivate']);
    $photo->__set('description', $_POST['description']);
    $connection = new Connection();
    $photoService = new PhotoService($connection, $photo);
    $photoService->upload_new_photo();
    header('Location: ../../design/profile.html');
?>
