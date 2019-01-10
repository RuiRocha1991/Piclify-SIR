<?php

    class CommentsPhotoService{
        private $connection;
	    public $commentPhoto;

        public function __construct(Connection $connection, Comment $commentPhoto) {
            $this->connection = $connection->createConnection();
            $this->commentPhoto = $commentPhoto;
        }

        public function addComment(){
            $query = "insert into comments (text, user, photo) values (:text, :id_user, :id_photo)";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':text', $this->commentPhoto->__get('text'));
            $stmt->bindValue(':id_user', $this->commentPhoto->__get('user'));
            $stmt->bindValue(':id_photo', $this->commentPhoto->__get('photo'));
            $stmt->execute();
        }

        

        public function countComments(){
            $query = "select count(id_comment) as countComments from comments where photo= :id_photo";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_photo', $this->commentPhoto->__get('photo'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }



       
    }



?>