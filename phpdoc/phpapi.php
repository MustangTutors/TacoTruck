<?php

class phpapi()
{
    /**
     * PHP API Constructor. Connects to the MySQL database.
     */
    function phpapi()
    {
        session_start();

        $con = mysqli_connect("localhost", "taco", "taco");
        if(!$con)
            die('Could not connect: ' . mysqli_error());
        mysqli_select_db("TacoTruck", $con)
        or die("Unable to select database: " . mysqli_error());
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
        $result = mysqli_query($query);

        // Convert the MySQL result into JSON.
        $rows = array();
        while($temp = mysqli_fetch_assoc($result))
            $rows[] = $temp;
        return json_encode(array($toppingType => $rows));
    }


    public function get_ToppingID($toppingID)
    {
	//Gets the taco topping ID
	$query = "SELECT taco_id from tacos where topping_ID ='$toppingID'";
	$result = mysqli_query($query);

	//MYSQL to JSON
	$rows = mysqli_fetch_assoc($result);
	return json_encode(array($toppingID => $rows));
    }


    /**
     * Add a user to the users table
     * @param STRING $firstName The user's first name.
     * @param STRING $lastName The user's last name.
     * @param STRING $email The user's email address.
     * @param STRING $password The user's password.
     * @param STRING $CCP The user's Credit Card Provider.
     * @param INT $CCN The user's Credit Card Number.
     * @return BOOLEAN Whether the insert succeeded or not.
     */
    public function addUser($firstName,$lastName,$email,$password,$CCP,$CCN)
    {
        // Add user information to users table
        $query = "INSERT INTO users(fName,lName,credit_provider,credit_number,email,pswd) VALUES ('$firstName','$lastName','$CCP','$CCN','$email','$password')";
        $result = mysqli_query($con,$query);
	return $result;
    }


    /**
     * Get information on all locations.
     * @param INT $id Optional id of one location     
     * @return JSON The addresses of all locations or of that requested.
     */
    public function get_Locations($id=-1)
    {	
	// Retrieve location data
        $query = "SELECT * FROM locations";
	if($id!=-1) $query = $query." WHERE loc_id='$id'";	  
        $result = mysqli_query($con,$query);

        // Convert the MySQL result into JSON.
        $rows = array();
        while($temp = mysqli_fetch_assoc($result))
            $rows[] = $temp;
        return json_encode(array("location" => $rows));
    }

   /**
     * Retrieve all information of a user  
     * @param INT ID of the user
     * @return JSON All of the particular user's information.
     */
    public function get_UserInfo($id)
    {
        // Retrieve user info
        $query = "SELECT * FROM users WHERE user_id='$id'";
        $result = mysqli_query($con,$query);
	
        // Convert the MySQL result into JSON.
        $rows = array();
        while($temp = mysqli_fetch_assoc($result))
            $rows[] = $temp;
        return json_encode(array('User '.$id => $rows));
    }


   /**
     * Verify that user/password combination is in the users table  
     * @param STRING $email The user's email address.
     * @param STRING $password The user's password.
     * @return INT ID of the user if verified, -1 if not.
     */
    public function verifyUser($email,$password)
    {
        // Retrieve list of matching $email/$passwords 
        $query = "SELECT user_id FROM users WHERE email='$email' AND pswd='$password";
        $result = mysqli_query($con,$query);
	$id=mysqli_fetch_row($result);
	if($id==NULL) return -1;
	return $id[0];
    }
}
	
}

?>
