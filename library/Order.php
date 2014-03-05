<?php
//This is the order class.
//functions:
/*
    getOrdersByUserId(id)
    getLastOrderByUserId(id)
    addOrder(user_id,quantities,corresponding topping_ids)
*/

include "../DB.php";

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
            $query = "SELECT t1.order_id,taco_id,quantity,topping_type,topping_name,topping_heat,topping_price FROM(SELECT orders.user_id, orders.order_id, MAX(order_dates) as MostRecent_order_date FROM orders WHERE user_id =? )as t1 NATURAL JOIN tacos NATURAL JOIN tacoToppings NATURAL JOIN toppings";
            $attributes = $this->db->query($query,array($userID));
            if(isset($attributes[0])){
                $this->_set($attributes[0]);
                echo (json_encode($attributes));
            }
            return FALSE;
        }
        
        //this adds an Order to the table
        public function addOrder($user_id,$quantities,$toppings){
            date_default_timezone_set('UTC');
            $date = getDate();
            $formattedDate = $date['year']."-".$date['mon']."-".$date['mday']." ".$date['hours'].":".$date['minutes'].":".$date['seconds'];
            $query = "INSERT INTO orders(user_id,order_dates) VALUES(?,?)";
            $results = $this->db->insert($query,array($user_id,$formattedDate));
            $results1;
            $count = 0;
            foreach($quantities as $quantity){
                $query = "INSERT INTO tacos (quantity,order_id)VALUES(?,?)";
                $results1[$count] = $this->db->insert($query,array($quantity,$results));
                $count++;
            }
            for($taco_iter= 0;$taco_iter<$count;$taco_iter++){
                for($topping_iter = 0;$topping_iter < count($toppings[$taco_iter]);$topping_iter++){
                    echo($toppings[$taco_iter][$topping_iter]);
                    $query = "INSERT INTO tacoToppings(topping_id,taco_id)VALUES(?,?)";
                    $attributes = $this->db->insert($query,array($toppings[$taco_iter][$topping_iter],$results1[$taco_iter]));
                    echo($results1[$taco_iter]);
                }
            }
        }
        
        
        //this sets all the order objects variables so that you can use them later if need be
        public function _set($dictionary) {
            $this->order_id = $dictionary['order_id'];
            $this->user_id = $dictionary['user_id'];
            $this->order_dates = $dictionary['order_dates'];
        }


    }
?>