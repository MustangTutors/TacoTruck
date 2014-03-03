<?php
//This is the user class.
//functions:
/*
    getUserById(id)
    getUserByEmailAndPassword(email,password)
    addUser(firstName,lastName,creditProvider,creditCardNumber,email,password)
*/
    class User{
        public $user_id;
        public $fName;
        public $lName;
        public $credit_provider;
        public $credit_number;
        public $email;
        public $pswd;
        private $db = FALSE;
        
        //this will get called automatically if a User object is made
        //just connects to the database to get it ready for the other functions
        function __construct(){
            $this->db = new DB(DB_HOST, DB_USER,DB_PASSWORD,DB_NAME);
        }
        
        //This echos a json object with the users info based on his/her id
        public function getUserById($id) {
            $attributes = $this->db->query("SELECT * FROM users WHERE user_id=?", array($id));
            if(isset($attributes[0])){
                $this->_set($attributes[0]);
                echo (json_encode($attributes));

            }
            return FALSE;
        }
        
        //this echos a json object with the users info based on the users email and password
        public function getUserByEmailAndPassword($email, $pwd) {
            $attributes = $this->db->query("SELECT * FROM users WHERE email=? AND pswd=?", array($email, $pwd));
            if(isset($attributes[0])){
                $this->_set($attributes[0]);
                echo (json_encode($attributes));
            }
            return FALSE;
        }
    
        //this sets all the User objects variables so that you can use them later if need be
        public function _set($dictionary) {
            $this->fName = $dictionary['fName'];
            $this->lName = $dictionary['lName'];
            $this->credit_provider = $dictionary['credit_provider'];
            $this->credit_number = $dictionary['credit_number'];
            $this->email = $dictionary['email'];
            $this->pswd = $dictionary['pswd'];
        }

        //this adds a new user to the database
        //notice this is a static function so this can get called without having to instantiate a new user object
        public static function addUser($fName,$lName,$creditProvider,$creditCardNum,$email,$password){
            $query = "INSERT INTO users (fName,lName,credit_provider,credit_number,email,pswd)VALUES (?,?,?,?,?,?)";
            $user_id = $this->db->insert($query, array($fName,$lName,$credit_provider,$credit_number,$email,$pswd)
        }
    


?>