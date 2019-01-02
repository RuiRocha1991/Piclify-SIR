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

    }
?>