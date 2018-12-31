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
			$stmt = $this->connection->prepare($query);;
            $stmt->bindValue(':description', $this->album->__get('description'));
            $stmt->bindValue(':user', $this->album->__get('user'));
			$stmt->execute(); 
        }

        public function getAlbumByUser() { 
			$query = "select * from albums where user =:user";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':user', $this->album->__get('user'));
            $stmt->execute(); 
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }
        
    }

?>