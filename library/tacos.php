<?php
//This is the Tacos class.
//functions:
/*
    getTacoById(id)
    getTacosByOrderId(name)
*/

    class Tacos{
            public $taco_id;
            public $quantity;
            public $order_id;
            private $db;
            
            //gets called automatically if a Tacos object is made
            //just sets up the object to call queries by connecting to the db
            function __construct(){
                $this->db = new DB(DB_HOST, DB_USER,DB_PASSWORD,DB_NAME);
            }
            //sets all the Taco varibales for later reference
            public function _set($dictionary){
                $this->taco_id = $dictionary['taco_id'];
                $this->quantity = $dictionary['quantity'];
                $this->order_id = $dictionary['order_id'];
            }
            //echos a json object holding the taco info based on its taco id
            public function getTacoById($taco_id){
                $query = "SELECT * FORM tacos WHERE taco_id = ?";
                $attributes = $this->db->query($query,array($taco_id));
                if(isset($attributes[0])){
                    this->set($attributes);
                    echo json_encode($attributes);
                }
                return FALSE;
            }
            //echos a json object holding the tacos based on the order ID
            public function getTacosByOrderId($order_id){
                $query = "SELECT * FORM tacos WHERE order_id = ?";
                $attributes = $this->db->query($query,array($order_id));
                if(isset($attributes[0])){
                    this->set($attributes);
                    echo json_encode($attributes);
                }
                return FALSE;
            }
            
    }
?>