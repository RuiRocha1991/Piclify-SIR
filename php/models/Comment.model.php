<?php 

    class Comment{
        public $id_comment;
        public $text;
        public $date;
        public $user;
        public $photo;

        public function __get($atributo) {
            return $this->$atributo;
        }

        public function __set($atributo, $valor) {
            $this->$atributo = $valor;
            return $this;
        }
    }

?>