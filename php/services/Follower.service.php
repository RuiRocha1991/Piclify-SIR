<?php
    class FollowerService{
        private $connection;
        public $follower;

        public function __construct(Connection $connection, Follower $follower){
            $this->connection =$connection->createConnection();
            $this->follower=$follower;
        }

        public function addFollower(){
            $query = 'insert into followers(id_user, id_follower) values(:id_user, :id_follower)';
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':id_user', $this->follower->__get('id_user'));
            $stmt->bindValue(':id_follower', $this->follower->__get('id_follower'));
            $stmt->execute();
        }

        public function verifyFollower(){
            $query='select count(id_user) as isFollower from followers where id_user =:id_user and id_follower=:id_follower';
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':id_user', $this->follower->__get('id_user'));
            $stmt->bindValue(':id_follower', $this->follower->__get('id_follower'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }

        public function removeFollower(){
            $query = 'delete from followers WHERE id_user =:id_user and id_follower=:id_follower';
            $stmt =$this->connection->prepare($query);
            $stmt->bindValue(':id_user', $this->follower->__get('id_user'));
            $stmt->bindValue(':id_follower', $this->follower->__get('id_follower'));
            $stmt->execute();
        }

        public function getMyFollowed(){
            $query = 'select id_user from followers WHERE  id_follower=:id_follower';
            $stmt =$this->connection->prepare($query);
            $stmt->bindValue(':id_follower', $this->follower->__get('id_follower'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }

        public function getPhotosMyFollowedAndMY() {
            $query = "SELECT photos.id_photo, photos.description, photos.name, photos.date_upload, photos.path, photos.user, user.name as nameUser, user.profile_photo, photos.is_private,( SELECT COUNT(likes_photo.id_photo) from likes_photo where likes_photo.id_photo = photos.id_photo ) AS countLikes, ( SELECT COUNT(comments.photo) from comments where comments.photo = photos.id_photo ) AS countComments, ( SELECT COUNT(likes_photo.id_photo) from likes_photo where likes_photo.id_photo = photos.id_photo and likes_photo.id_user = :id_follower) AS isLike from photos, user WHERE (photos.is_private=0 or (photos.user = (SELECT followers.id_user from followers where followers.id_follower=:id_follower and followers.id_user= photos.user) and photos.is_private=1) or photos.user=:id_follower) and photos.user = user.id_user ORDER by photos.date_upload DESC";
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':id_follower', $this->follower->__get('id_follower'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }
    }
?>