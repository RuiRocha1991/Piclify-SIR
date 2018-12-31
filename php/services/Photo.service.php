<?php

    class PhotoService{
        private $connection;
	    public $photo;

        public function __construct(Connection $connection, Photo $photo) {
            $this->connection = $connection->createConnection();
            $this->photo = $photo;
        }

        public function upload_new_photo() { 
			$query = "insert into photos(description,date_upload,name,path,user,is_private) values :description , :date_upload, :name, :path, :user, :is_private";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':description', $this->photo->__get('description'));
            $stmt->bindValue(':date_upload', $this->photo->__get('date_upload'));
            $stmt->bindValue(':name', $this->photo->__get('name'));
            $stmt->bindValue(':path', $this->photo->__get('path'));
            $stmt->bindValue(':is_private', $this->photo->__get('is_private'));
			$stmt->bindValue(':id', $this->photo->__get('user'));
			$stmt->execute(); 
		}

?>