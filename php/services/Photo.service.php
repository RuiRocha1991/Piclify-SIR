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
        
        public function getPhotosByUser() {
            $query = "select * from photos where user = :id_user";
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':id_user', $this->photo->__get('user'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
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
    }



?>