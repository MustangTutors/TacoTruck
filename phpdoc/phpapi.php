<?php

class phpapi()
{
    /**
     * PHP API Constructor. Connects to the MySQL database.
     */
    function phpapi()
    {
        session_start();

        $con = mysql_connect("localhost", "taco", "taco");
        if(!$con)
            die('Could not connect: ' . mysql_error());
        mysql_select_db("TacoTruck", $con)
        or die("Unable to select database: " . mysql_error());
    }

    /**
     * Get information on toppings.
     * @param STRING $toppingType The type of topping wanted.
     * @return JSON A list of all the toppings of a given type.
     */
    public function get_ToppingInfo($toppingType)
    {
        // Get all the toppings of a type $toppingType
        $query = "SELECT * FROM tacos NATURAL JOIN tacoToppings NATURAL JOIN toppings WHERE topping_type='$toppingType'";
        $result = mysql_query($query);

        // Convert the MySQL result into JSON.
        $rows = array();
        while($temp = mysql_fetch_assoc($result))
            $rows[] = $temp;
        return json_encode(array($toppingType => $rows));
    }


    public function get_ToppingID($toppingID)
    {
	//Gets the taco topping ID
	$query = "SELECT taco_id from tacos where topping_ID ='$toppingID'";
	$result = mysql_query($query);

	//MYSQL to JSON
	$rows = mysql_fetch_assoc($result);
	return json_encode(array($toppingID => $rows));
    }
	
}

?>
