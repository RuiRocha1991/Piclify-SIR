<?php

    class PhotoService{
        private $connection;
	    public $photo;

        public function __construct(Connection $connection, Photo $photo) {
            $this->connection = $connection->createConnection();
            $this->photo = $photo;
        }

        public function upload_new_photo() { 
			$query = "insert into photos(description,name,path,user,is_private) values (:description , :name, :path, :user, :is_private)";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':description', $this->photo->__get('description'));     
            $stmt->bindValue(':name', $this->photo->__get('name'));
            $stmt->bindValue(':path', $this->photo->__get('path'));
            $stmt->bindValue(':is_private', $this->photo->__get('is_private')?true:false);
            $stmt->bindValue(':user', $this->photo->__get('user'));
			$stmt->execute(); 
        }

        public function update_photo(){
            $query = "update photos set name= :name, description= :description, is_private= :is_private where id_photo = :id_photo";
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':description', $this->photo->__get('description'));     
            $stmt->bindValue(':name', $this->photo->__get('name'));
            $stmt->bindValue(':is_private', $this->photo->__get('is_private')?true:false);
            $stmt->bindValue(':id_photo', $this->photo->__get('id_photo'));
            $stmt->execute(); 
        }
        
        public function getPhotosByUser() {
            $query = "select * from photos where user = :id_user";
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':id_user', $this->photo->__get('user'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }

        public function getPhotoById() {
            $query = "SELECT *, (SELECT COUNT(likes_photo.id_photo) from likes_photo WHERE likes_photo.id_photo = photos.id_photo) as countLikes, (SELECT COUNT(comments.photo) from comments WHERE comments.photo = photos.id_photo) as countComments, (SELECT COUNT(albums_photos.photo) from albums_photos WHERE albums_photos.photo = photos.id_photo) as countAlbums, (SELECT COUNT(group_photo_relations.photo) from group_photo_relations WHERE group_photo_relations.photo = photos.id_photo) as countGroups FROM photos WHERE photos.id_photo=:id_photo order BY photos.date_upload desc";
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':id_photo', $this->photo->__get('id_photo'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }

        public function getAllPhotosPublicByUser() {
            $query = "select * from photos where is_private=0 and user = :id_user";
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':id_user', $this->photo->__get('user'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }
        
        public function getPhotoByIdToFollower() {
            $query = "select * from photos where is_private=0 and id_photo = :id_photo";
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':id_photo', $this->photo->__get('id_photo'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }

        public function getPhotosToMyProfile() {
            $query = "SELECT *, (SELECT COUNT(likes_photo.id_photo) from likes_photo WHERE likes_photo.id_photo = photos.id_photo) as countLikes, (SELECT COUNT(comments.photo) from comments WHERE comments.photo = photos.id_photo) as countComments, (SELECT COUNT(albums_photos.photo) from albums_photos WHERE albums_photos.photo = photos.id_photo) as countAlbums, (SELECT COUNT(group_photo_relations.photo) from group_photo_relations WHERE group_photo_relations.photo = photos.id_photo) as countGroups FROM photos WHERE photos.user=:id_user order BY photos.date_upload desc";
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':id_user', $this->photo->__get('id_user'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }
    }



?>