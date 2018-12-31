<?php

    class GroupService{
        private $connection;
	    public $group;

        public function __construct(Connection $connection, Group_photo $group) {
            $this->connection = $connection->createConnection();
            $this->group = $group;
        }

        public function create() { 
			$query = "insert into photo_group(owner, description, title) values  (:owner, :description, :title)";
			$stmt = $this->connection->prepare($query);;
            $stmt->bindValue(':owner', $this->group->__get('owner'));
            $stmt->bindValue(':description', $this->group->__get('description'));
            $stmt->bindValue(':title', $this->group->__get('title'));
			$stmt->execute(); 
        }

        public function getGroupByOwnerTitleDescription() { 
			$query = "select * from photo_group where owner =:owner and description=:description and title=:title";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':owner', $this->group->__get('owner'));
            $stmt->bindValue(':description', $this->group->__get('description'));
            $stmt->bindValue(':title', $this->group->__get('title'));
            $stmt->execute(); 
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }
    }

?>