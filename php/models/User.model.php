<?php 

    class User{
        public $id_user;
        public $name;
        public $email;
        public $password;
        public $genre;
        public $locality;
        public $country;
        public $birth_date;
        public $profile_photo;
        public $is_validate;
        public $is_active;

        public function __get($atributo) {
            return $this->$atributo;
        }

        public function __set($atributo, $valor) {
            $this->$atributo = $valor;
            return $this;
        }
    }

?>