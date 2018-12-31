<?php 

    class Album{
        public $id_album;
        public $description;
        public $create_date;
        public $user;

        public function __get($atributo) {
            return $this->$atributo;
        }

        public function __set($atributo, $valor) {
            $this->$atributo = $valor;
            return $this;
        }
    }

?>