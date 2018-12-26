<?php 

    class Group_photo{
        public $id_group;
        public $owner;
        public $description;
        public $title;

        public function __get($atributo) {
            return $this->$atributo;
        }

        public function __set($atributo, $valor) {
            $this->$atributo = $valor;
            return $this;
        }
    }

?>