<?php
//This is the toppings class.
//functions:
/*
    getToppingById(id)
    getToppingByToppingName(name)
    getToppingByToppingPrice(price)
    getToppingByToppingHeat(heat)
    getToppingByToppingType(type)
    getAllToppings()
*/
include_once "../DB.php";

    class Toppings{
        public $topping_id;
        public $topping_name;
        public $topping_heat;
        public $topping_price;
        public $topping_type;
        private $db;
        
	/**
        * this will get called automatically if a Toppings object is made
        * just connects to the database to get it ready for the other functions
	*/
        function __construct(){
            $this->db = new DB(DB_HOST, DB_USER,DB_PASSWORD,DB_NAME);
        }
        /**
    	* this sets all the Topping objects variables so that you can use them later if need be
    	* @param ARRAY $dictionary Array of the attributes of the topping
        */
        public function _set($dictionary) {
            $this->topping_id = $dictionary['topping_id'];
            $this->topping_name = $dictionary['topping_name'];
            $this->topping_heat = $dictionary['topping_heat'];
            $this->topping_price = $dictionary['topping_price'];
            $this->topping_type = $dictionary['topping_type'];
        }

	/**
        * echos a json object holding topping's info from its type
	* @param INT $toppingID ID of topping to be searched for
	*/
        function getToppingById($toppingID){
            $attributes = $this->db->query("SELECT * FROM toppings WHERE id=?", array($toppingID));
            if(isset($attributes[0])){
                $this->_set($attributes[0]);
                echo (json_encode($attributes));
            }
            return FALSE;
        }
        
	/**
        * echos a json object holding topping's info from its name
	* @param STRING $toppingName Name of topping to be searched for
	*/
        public function getToppingByToppingName($toppingName){
            $attributes = $this->db->query("SELECT * FROM toppings WHERE topping_name = ?",array($toppingName));
            if(isset($attributes[0])){
                $this->_set($attributes[0]);		
                echo (json_encode($attributes));

            }
            return FALSE;
        }

	/**
        * echos a json object holding topping's info from its price
	* @param STRING $toppingPrice Price of topping to be searched for
	*/
        public function getToppingByToppingPrice($toppingPrice){
            $attributes = $this->db->query("SELECT * FROM toppings WHERE topping_price = ?",array($toppingPrice));
            if(isset($attributes[0])){
                $this->_set($attributes[0]);
                echo (json_encode($attributes));

            }
            return FALSE;
        }

	/**
        * echos a json object holding topping's info from its heat
	* @param STRING $toppingHeat Heat of topping to be searched for
	*/
        public function getToppingByToppingHeat($toppingHeat){
            $attributes = $this->db->query("SELECT * FROM toppings WHERE topping_heat = ?",array($toppingHeat));
            if(isset($attributes[0])){
                $this->_set($attributes[0]);
                echo (json_encode($attributes));

            }
            return FALSE;
        }
	/**
        * echos a json object holding topping's info from its type
	* @param STRING $toppingType Type of topping to be searched for
	*/
        public function getToppingByToppingType($toppingType){
            $attributes = $this->db->query("SELECT * FROM toppings WHERE topping_type = ?",array($toppingType));
            if(isset($attributes[0])){
                $this->_set($attributes[0]);
		$i=array($toppingType=>array());
		foreach($attributes as $result){			
			$tacoJson=array();
			$tacoJson["id"]=$result['topping_id'];
			$tacoJson["name"]=$result['topping_name'];		
			if($toppingType == "sauces") $tacoJson["heat"]=$result['topping_heat'];
			$tacoJson["price"]=$result['topping_price'];
			array_push($i[$toppingType],$tacoJson);
		}
                echo (json_encode($i));
            }
            return FALSE;
        }

        /**
	*echos a json object holding all the toppings
	*/
        public function getAllToppings(){
	echo "{ \"toppings\":[";     
	$this->getToppingByToppingType("type");
	$this->getToppingByToppingType("tortillas"); 
	$this->getToppingByToppingType("rice");
	$this->getToppingByToppingType("cheese");
	$this->getToppingByToppingType("beans");
	$this->getToppingByToppingType("sauces");
	$this->getToppingByToppingType("vegetables");
	$this->getToppingByToppingType("extras");
	echo"]}";
        }





    }
?>
