<?php

class Connection {

	public $host = 'localhost';
	public $dbname = 'piclify_database';
	public $user = 'sir';
	public $pass = 'dados2018';

	public function createConnection() {
		try {
			$connection = new PDO(
				"mysql:host=$this->host;dbname=$this->dbname",
				"$this->user",
				"$this->pass"				
			);
			return $connection;
		} catch (PDOException $e) {
			echo '<p>'.$e->getMessege().'</p>';
		}
	}
}

?>