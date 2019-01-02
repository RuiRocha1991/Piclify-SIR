<?php

    class PhotoService{
        private $connection;
	    public $photo;

        public function __construct(Connection $connection, Photo $photo) {
            $this->connection = $connection->createConnection();
            $this->photo = $photo;
        }

        public function upload_new_photo() { 
            var_dump($this->photo);
			$query = "insert into photos(description,name,path,user,is_private) values (:description , :name, :path, :user, :is_private)";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':description', $this->photo->__get('description'));     
            $stmt->bindValue(':name', $this->photo->__get('name'));
            $stmt->bindValue(':path', $this->photo->__get('path'));
            $stmt->bindValue(':is_private', $this->photo->__get('is_private')?true:false);
            $stmt->bindValue(':user', $this->photo->__get('user'));
			$stmt->execute(); 
        }
        
    }

?>