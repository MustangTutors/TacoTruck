<?php
//This is the locations class.
//functions:
/*
    getLocations()
*/

include "../DB.php";

    class Locations{
        
        //this will get called automatically if a Toppings object is made
        //just connects to the database to get it ready for the other functions
        function __construct(){
            $this->db = new DB(DB_HOST, DB_USER,DB_PASSWORD,DB_NAME);
        }
        
        //echos a json object holding all of the locations and their info
        public function getLocations(){
            $query = "SELECT * FROM locations";
            $attributes = $this->db->query($query,array());
            echo (json_encode($attributes));
        }
}
