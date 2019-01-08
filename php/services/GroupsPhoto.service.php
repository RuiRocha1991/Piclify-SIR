<?php

    class GroupsPhotoService{
        private $connection;
	    public $groupsPhoto;

        public function __construct(Connection $connection, Group_photo_relations $groupsPhoto) {
            $this->connection = $connection->createConnection();
            $this->groupsPhoto = $groupsPhoto;
        }

        public function addPhotoInGroup(){
            $query = "insert into group_photo_relations (group, photo) values (:id_group, :id_photo)";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_group', $this->groupsPhoto->__get('group'));
            $stmt->bindValue(':id_photo', $this->groupsPhoto->__get('photo'));
            $stmt->execute();
        }

        public function removeGroupOfPhoto(){
            $query = "delete from group_photo_relations where group= :id_group and photo = :id_photo";
            $stmt= $this->connection->prepare($query);
            $stmt->bindValue(':id_album', $this->groupsPhoto->__get('album'));
            $stmt->bindValue(':id_photo', $this->groupsPhoto->__get('photo'));
            
            $stmt->execute();
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