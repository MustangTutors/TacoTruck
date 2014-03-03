<?php
//This is the TacoToppings class.
//functions:
/*
    getTacoToppingsByTacoId(id)
*/

    class TacoToppings{
        public $tacoTopping_id;
        public $topping_id;
        public $taco_id;
        private $db;
        //automatically gets called when a TacoToppings object is made
        //just connects to the db to get set up for the queries
        function __construct(){
            $this->db = new DB(DB_HOST, DB_USER,DB_PASSWORD,DB_NAME);
        }
        //echos a json object holding the tacoToppings based on the taco ID
        public function getTacoToppingsByTacoId($tacoID){
            $query = "SELECT * FROM tacoToppings WHERE taco_id = ?";
            $attributes = $this->db->query($query,array($taco_id));
            if(isset($attributes[0])){
                $this->_set($attributes);
                echo json_encode($attributes);
            }
            return FALSE;
        }
        //sets TacoToppings variables so they can be accessed later if needed
        public function _set($dictionary){
            $this->tacoTopping_id = $dictionary['tacoTopping_id'];
            $this->topping_id = $dictionary['topping_id'];
            $this->taco_id = $dictionary['taco_id'];
        }
        
    }
?>