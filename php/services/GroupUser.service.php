<?php

    class GroupUserService{
        private $connection;
	    public $groupUser;

        public function __construct(Connection $connection, Group_user $groupUser) {
            $this->connection = $connection->createConnection();
            $this->groupUser = $groupUser;
        }

        public function create() { 
			$query = "insert into group_user(group,user) values  (:group, :user)";
			$stmt = $this->connection->prepare($query);;
            $stmt->bindValue(':group', $this->groupUser->__get('group'));
            $stmt->bindValue(':user', $this->groupUser->__get('user'));
			$stmt->execute(); 
        }

        public function getGroupByUser() { 
			$query = "select * from group_user where user =:user";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':user', $this->groupUser->__get('user'));
            $stmt->execute(); 
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }
        
    }

?>