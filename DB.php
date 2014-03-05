<?php
//This is just a basic DB class that can handle query execute and insert functions. It separates the whole connection portion of database management.
    class DB
    {
        private $host;
        private $username;
        private $password;
        private $database;
        private $conn;
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
        
        //this function is for altering the tables
        public function execute($query,$params=array()){
            try{
                $statement = $this->conn->prepare($query);
                $statement->execute($params);
            }catch(PDOException $e){
                throw new Exception($e->getMessage());
            }           
        }
        
        //this is for inserting into the tables
        //it returns the id of the last inserted object
        public function insert($query,$params=array()){
            try{
                $statement = $this->conn->prepare($query);
                $statement->execute($params);
                return $this->conn->lastInsertId();
            }catch(PDOException $e){
                throw new Exception($e->getMessage());
            }    
            
        }
        
        //this is for querying from the tables
        //it returns an array of the query results
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