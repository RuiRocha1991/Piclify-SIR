<?php

    class AlbumsPhotoService{
        private $connection;
	    public $albumsPhoto;

        public function __construct(Connection $connection, Albums_Photo $albumsPhoto) {
            $this->connection = $connection->createConnection();
            $this->albumsPhoto = $albumsPhoto;
        }

        public function addPhotoInAlbum(){
            $query = "insert into albums_photos (album, photo) values (:id_album, :id_photo)";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_album', $this->albumsPhoto->__get('album'));
            $stmt->bindValue(':id_photo', $this->albumsPhoto->__get('photo'));
            
            $stmt->execute();
        }

        public function removeAlbumOfPhoto(){
            $query = "delete from albums_photos where album= :id_album and photo = :id_photo";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_album', $this->albumsPhoto->__get('album'));
            $stmt->bindValue(':id_photo', $this->albumsPhoto->__get('photo'));
            
            $stmt->execute();
        }

        public function getAlbumsByPhoto() { 
			$query = "select * from albums_photos where photo =:id_photo";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':id_photo', $this->albumsPhoto->__get('photo'));
            $stmt->execute(); 
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }

        public function countAlbumsByPhoto(){
            $query = "select count(photo) as countAlbums from albums_photos where photo= :id_photo";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_photo', $this->albumsPhoto->__get('photo'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        } 
    }



?>