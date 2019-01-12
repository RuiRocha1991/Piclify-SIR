<?php

    class AlbumService{
        private $connection;
	    public $album;

        public function __construct(Connection $connection, Album $album) {
            $this->connection = $connection->createConnection();
            $this->album = $album;
        }

        public function create() { 
			$query = "insert into albums(description,user) values  (:description, :user)";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':description', $this->album->__get('description'));
            $stmt->bindValue(':user', $this->album->__get('user'));
			$stmt->execute(); 
        }

        public function getAlbumByUser() { 
			$query = "SELECT *, (select COUNT(albums_photos.album) from albums_photos where albums_photos.album = albums.id_albums) as totalPhotos FROM albums where user=:user";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':user', $this->album->__get('user'));
            $stmt->execute(); 
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }

    
        
    }

?>