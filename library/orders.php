<?php
//This is the order class.
//functions:
/*
    getOrdersByUserId(id)
    getLastOrderByUserId(id)
*/

    class Order{
        public $order_id;
        public $user_id;
        public $order_dates;
        private $db;
        
        //this will get called automatically if a Toppings object is made
        //just connects to the database to get it ready for the other functions
        function __construct(){
            $this->db = new DB(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
        }
        //echos a json object holding the Orders for a particular User ID
        public function getOrdersByUserId($userID){
            $query = "SELECT * FROM orders WHERE user_id = ?";
            $attributes = $this->db->query($query,array($userID));
            if(isset($attributes[0])){
                $this->_set($attributes[0]);
                echo (json_encode($attributes));
            }
            return FALSE;
        }
        //echos a json object holding the last order based on the User ID
        public function getLastOrderByUserId($userID){
            $query = 'SELECT orders.user_id,orders.order_id,MAX(order_dates) as MostRecent_order_date FROM orders WHERE user_id = ?';
            $attributes = $this->db->query($query,array($userID));
            if(isset($attributes[0])){
                $this->_set($attributes[0]);
                echo (json_encode($attributes));
            }
            return FALSE;
        }
        //this sets all the order objects variables so that you can use them later if need be
        public function _set($dictionary) {
            $this->order_id = $dictionary['order_id'];
            $this->user_id = $dictionary['user_id'];
            $this->order_dates = $dictionary['order_dates'];
        }


    }
?>