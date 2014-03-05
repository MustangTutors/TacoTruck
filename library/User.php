<?php
//This is the user class.
//functions:
/*
    getUserById(id)
    getUserByEmailAndPassword(email,password)
    addUser(firstName,lastName,creditProvider,creditCardNumber,email,password)
    updatePassword($newPassword)
*/

include_once "../DB.php";


//the salt I used when hashing the passwords
define('USER_SALT', 'balloon coyote$1');

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
        function __construct($id = NULL){
            $this->db = new DB(DB_HOST, DB_USER,DB_PASSWORD,DB_NAME);
            if(!is_null($id)) {
                $this->getUserById($id);
            }
        }
        
        //This echos a json object with the users info based on his/her id
        public function getUserById($id) {
            $attributes = $this->db->query("SELECT * FROM users WHERE user_id=?", array($id));
            if(isset($attributes[0])){
                $this->_set($attributes[0]);		
                return TRUE;
            }
            return FALSE;
        }
        
        //this echos a json object with the users info based on the users email and password
        public function getUserByEmailAndPassword($email, $pwd) {
            $attributes = $this->db->query("SELECT * FROM users WHERE email=? AND pswd=?", array($email, User::securePassword($pwd)));
            if(isset($attributes[0])){
               $this->_set($attributes[0]);
	       return TRUE;
            }
            return FALSE;
        }
    
        //this sets all the User objects variables so that you can use them later if need be
        public function _set($dictionary) {
            $this->user_id = $dictionary['user_id'];
            $this->fName = $dictionary['fName'];
            $this->lName = $dictionary['lName'];
            $this->credit_provider = $dictionary['credit_provider'];
            $this->credit_number = $dictionary['credit_number'];
            $this->email = $dictionary['email'];
            $this->pswd = $dictionary['pswd'];
            
        }
        
        //this allows the user to update his password--calls the secure password static function for security before updating
        public function updatePassword($password) {
            $this->db->execute("UPDATE users SET pswd=? WHERE user_id=?", 
                array(User::securePassword($password), $this->user_id));
        }
        
        //checks if an email exists -- called in my add user function
        public static function emailExists($email) {
            $db = new DB(DB_HOST, DB_USER,DB_PASSWORD,DB_NAME);
            $attributes = $db->query("SELECT * FROM users WHERE users.email =?",array($email));
            if(isset($attributes[0])){
                return true;
            }
            else return false;
        }

        //this adds a new user to the database
        //notice this is a static function so this can get called without having to instantiate a new user object
        public static function addUser($fName,$lName,$creditProvider,$creditCardNum,$email,$password){
            if(! User::emailExists($email)){
                $db = new DB(DB_HOST, DB_USER,DB_PASSWORD,DB_NAME);
                $hashed_pwd = User::securePassword($password);
                $query = "INSERT INTO users (fName,lName,credit_provider,credit_number,email,pswd) VALUES (?,?,?,?,?,?)";
                $user_id = $db->insert($query, array($fName,$lName,$creditProvider,$creditCardNum,$email,$hashed_pwd));
                return $user_id;
            }
        }
            
        //this is a static function(can be called without needing to instantiate a user object) that hashes the concatenation of the 
        //selected password with the salt
        //This is called in my add user function as well as in my update Password function
        public static function securePassword($password) {
            return md5($password.USER_SALT);
        }
    

}
?>
