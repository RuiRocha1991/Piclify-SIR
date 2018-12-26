<?php 

    class Albums{
        public $id_albums;
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