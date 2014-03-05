<?php
//This is the order class.
//functions:
/*
    getOrdersByUserId(id)
    getLastOrderByUserId(id)
    addOrder(user_id,quantities,corresponding topping_ids)
*/

include_once "../DB.php";

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
            $query = "SELECT taco_id,quantity,topping_id FROM(SELECT orders.user_id, orders.order_id, MAX(order_dates) as MostRecent_order_date FROM orders WHERE user_id =? )as t1 NATURAL JOIN tacos NATURAL JOIN tacoToppings NATURAL JOIN toppings";
            $attributes = $this->db->query($query,array($userID));
            if(isset($attributes[0])){
		$i=array("previousOrder"=>array());
		$tacoNum=$attributes[0]["taco_id"];
		$tacoJson=array();
		$tacoJson["quantity"]=$attributes[0]['quantity'];
		$tacoJson["toppings"]=array();
		for($x=0;$x<count($attributes);$x++){			
			if($attributes[$x]["taco_id"]!=$tacoNum){
				array_push($i["order"],$tacoJson);
				unset($tacoJson);
				$tacoNum=$attributes[$x]["taco_id"];
				$tacoJson=array();				
				$tacoJson["quantity"]=$attributes[$x]['quantity'];
				$tacoJson["toppings"]=array();
			}			
		array_push($tacoJson["toppings"],$attributes[$x]["topping_id"]);
		}

		array_push($i["previousOrder"],$tacoJson);
              echo json_encode($i);
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
