<?php 

    class Photo{
        public $id_photo;
        public $date_upload;
        public $deadline_link;
        public $description;
        public $link_share;
        public $name;
        public $path;
        public $is_private;
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