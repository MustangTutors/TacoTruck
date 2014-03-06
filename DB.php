<?php
//This is just a basic DB class that can handle query execute and insert functions. It separates the whole connection portion of database management.
    class DB
    {
        private $host;
        private $username;
        private $password;
        private $database;
        private $conn;

	/**
	* Creates a DB object that holds all the information required to connect to the database.
	* @param STRING $host Hostname or ip address of the server.
	* @param STRING $usrname Username used to log into MySQL.
	* @param STRING $pswd Passsword used to log into MySQL.
	* @param STRING $db_name name of the database to use for MySQL queries.
	*/
        public function __construct($host,$usrname,$pswd,$db_name){
            $dsn = "mysql:host=$host;dbname=$db_name";
            try{
                $this->host = $host;
                $this->username = $usrname;
                $this->password = $pswd;
                $this->database = $db_name;
                $this->conn = new PDO($dsn,$this->username,$this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    
            }
            catch (PDOException $e){
                $this->conn = null;
                exit("Connection failed: ".$e->getMessage());
            }

        }
        
        /**
	* this function is for altering the tables
	* @param STRING $query The query that will be used to retrieve info from the database.
	* @param ARRAY $params The parameters from the calling function to be inserted into the placeholder variables in $query
	*/
        public function execute($query,$params=array()){
            try{
                $statement = $this->conn->prepare($query);
                $statement->execute($params);
            }catch(PDOException $e){
                throw new Exception($e->getMessage());
            }           
        }

        /**        
        * this is for inserting into the tables
	* @param STRING $query The query that will be used to retrieve info from the database.
	* @param ARRAY $params The parameters from the calling function to be inserted into the placeholder variables in $query
	* @return INT ID of the last inserted object
	*/
        public function insert($query,$params=array()){
            try{
                $statement = $this->conn->prepare($query);
                $statement->execute($params);
                return $this->conn->lastInsertId();
            }catch(PDOException $e){
                throw new Exception($e->getMessage());
            }    
            
        }
        
        /**
	* this function is for querying from the tables
	* @param STRING $query The query that will be used to retrieve info from the database.
	* @param ARRAY $params The parameters from the calling function to be inserted into the placeholder variables in $query
	* @return ARRAY The results of the query
	*/
        public function query($query,$params=array()){
            try{
                $statement = $this->conn->prepare($query);
                $statement->execute($params);
                $results = $statement->fetchAll(PDO::FETCH_ASSOC);
                return $results;
            }catch(PDOException $e){
                throw new Exception($e->getMessage());
            }        
               
        }

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    }

?>
