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

		public function upload_photo_profile($target) { 
			$query = "update user set profile_photo = :photo where id_user = :id";
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(':photo', $target);
			$stmt->bindValue(':id', $this->user->__get('id_user'));
			$stmt->execute(); 
		}

		public function getNumberFollowers() { 
			$query = 'select COUNT(id_user)  AS followers from followers where id_user=:id';
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(':id', $this->user->__get('id_user'));
			$stmt->execute();
			return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
		}

		public function login() { //login
			$query = 'select *from user where email=:email and password =:password';
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(':email', $this->user->__get('email'));
			$stmt->bindValue(':password', $this->user->__get('password'));
			$stmt->execute();
			return $stmt->fetchAll(PDO::FETCH_OBJ);
		}

		public function upload_new_photo($target) { 
			$query = "update user set profile_photo = :photo where id_user = :id";
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(':photo', $target);
			$stmt->bindValue(':id', $this->user->__get('id_user'));
			$stmt->execute(); 
		}

		public function getDetailsUserById() { 
			$query = 'select * from user where id_user = :id_user';
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(':id_user', $this->user->__get('id_user'));
			$stmt->execute();
			return $stmt->fetchAll(PDO::FETCH_OBJ);
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