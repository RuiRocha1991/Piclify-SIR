<?php

    class GroupsPhotoService{
        private $connection;
	    public $groupsPhoto;

        public function __construct(Connection $connection, Group_photo_relations $groupsPhoto) {
            $this->connection = $connection->createConnection();
            $this->groupsPhoto = $groupsPhoto;
        }

        public function addPhotoInGroup(){
            $query = "insert into group_photo_relations (id_group, photo) values (:id_group, :id_photo)";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_group', $this->groupsPhoto->__get('group'));
            $stmt->bindValue(':id_photo', $this->groupsPhoto->__get('photo'));
            $stmt->execute();
        }

        public function removeGroupOfPhoto(){
            $query = "delete from group_photo_relations where id_group= :id_group and photo = :id_photo";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_group', $this->groupsPhoto->__get('group'));
            $stmt->bindValue(':id_photo', $this->groupsPhoto->__get('photo'));
            
            $stmt->execute();
        }

        public function getGroupsByPhoto() { 
			$query = "select * from group_photo_relations where photo =:id_photo";
			$stmt = $this->connection->prepare($query);
            $stmt->bindValue(':id_photo', $this->groupsPhoto->__get('photo'));
            $stmt->execute(); 
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }

        public function countGroupsByPhoto(){
            $query = "select count(photo) as countGroups from group_photo_relations where photo= :id_photo";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_photo', $this->groupsPhoto->__get('photo'));
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }
    }
?>