<?php

    class UserService{
        private $connection;
	    public $user;

        public function __construct(Connection $connection, User $user) {
            $this->connection = $connection->createConnection();
            $this->user = $user;
        }

        public function create() { //create
            $query = 'insert into user(birth_date, country, email, genre, is_validate, locality, name, password )
			values(:birth_date, :country, :email, :genre, :is_validate, :locality, :name, :password)';
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':birth_date', $this->user->__get('birth_date'));
            $stmt->bindValue(':country', $this->user->__get('country'));
            $stmt->bindValue(':email', $this->user->__get('email'));
            $stmt->bindValue(':genre', $this->user->__get('genre'));
            $stmt->bindValue(':is_validate', false);
            $stmt->bindValue(':locality', $this->user->__get('locality'));
            $stmt->bindValue(':name', $this->user->__get('name'));
			$stmt->bindValue(':password', $this->user->__get('password'));
			//is_active
			$stmt->execute();
        }

		public function getNewUser() { //read
			$query = '
				select 
					*
				from 
					user 
				where
					email=:email';
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(':email', $this->user->__get('email'));
			$stmt->execute();
			return $stmt->fetchAll(PDO::FETCH_OBJ);
		}

		public function upload_photo_profile($target) { //update
			$query = "update user set profile_photo = :photo where id_user = :id";
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(':photo', $target);
			$stmt->bindValue(':id', $this->user->__get('id_user'));
			$stmt->execute(); 
		}

		public function remover() { //delete

			/*$query = 'delete from tb_tarefas where id = :id';
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(':id', $this->tarefa->__get('id'));
			$stmt->execute();*/
		}

		public function marcarRealizada() { //update

			/*$query = "update tb_tarefas set id_status = ? where id = ?";
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(1, $this->tarefa->__get('id_status'));
			$stmt->bindValue(2, $this->tarefa->__get('id'));
			return $stmt->execute(); */
		}

		public function recuperarTarefasPendentes() {
			/*$query = '
				select 
					t.id, s.status, t.tarefa 
				from 
					tb_tarefas as t
					left join tb_status as s on (t.id_status = s.id)
				where
					t.id_status = :id_status
			';
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(':id_status', $this->tarefa->__get('id_status'));
			$stmt->execute();
			return $stmt->fetchAll(PDO::FETCH_OBJ);*/
		}
    }

?>