<?php

    class LikesPhotoService{
        private $connection;
	    public $likesPhoto;

        public function __construct(Connection $connection, Like_photo $likesPhoto) {
            $this->connection = $connection->createConnection();
            $this->likesPhoto = $likesPhoto;
        }

        public function addLike(){
            $query = "insert into likes_photo (id_photo, id_user) values (:id_photo, :id_user)";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_photo', $this->likesPhoto->__get('id_photo'));
            $stmt->bindValue(':id_user', $this->likesPhoto->__get('id_user'));
            $stmt->execute();
        }

        public function removeLike(){
            $query = "delete from likes_photo where id_photo= :id_photo AND id_user = :id_user";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_photo', $this->likesPhoto->__get('id_photo'));
            $stmt->bindValue(':id_user', $this->likesPhoto->__get('id_user'));
            $stmt->execute();
        }

        public function countLikes(){
            $query = "select count(id_photo) as countLikes from likes_photo where id_photo= :id_photo";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_photo', $this->likesPhoto->__get('id_photo'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }

        public function isLikePhoto(){
            $query = "select *  from likes_photo where id_photo= :id_photo and id_user =:id_user";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_photo', $this->likesPhoto->__get('id_photo'));
            $stmt->bindValue(':id_user', $this->likesPhoto->__get('id_user'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }
    }
?>