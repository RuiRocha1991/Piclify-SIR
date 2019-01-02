<?php

    class GroupUserService{
        private $connection;
	    public $groupUser;

        public function __construct(Connection $connection, User_group $groupUser) {
            $this->connection = $connection->createConnection();
            $this->groupUser = $groupUser;
        }

        public function create() { 
			$query = "insert into user_group(idGroup, idUser) values (:group, :user)";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':group', $this->groupUser->__get('group'));
            $stmt->bindValue(':user', $this->groupUser->__get('user'));
			$stmt->execute(); 
        }

        public function getGroupsByUser() { 
			$query = "select * from user_group where idUser =:user";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':user', $this->groupUser->__get('user'));
            $stmt->execute(); 
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }

        public function getListUsersByGroup() { 
			$query = "select * from user_group where idGroup =:group";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':group', $this->groupUser->__get('group'));
            $stmt->execute(); 
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }
        
    }

?>