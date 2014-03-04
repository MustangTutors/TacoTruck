<?php 

//This class will parse the csv and the json files and load them into your data base.
    include "init.php";
    $dbInstance = new DB(DB_HOST, DB_USER,DB_PASSWORD,DB_NAME);

    //load locations table
    $json_url = "taco_truck_locations.json";
    $json = file_get_contents($json_url);
    $data = json_decode($json,true);    
    foreach($data as $row)
    {
        $query = "INSERT INTO locations (loc_name,street,city,state,zip)VALUES (?,?,?,?,?)";
        $results = $dbInstance->insert($query, array($row["name"], $row["address"],$row["city"],$row["state"],$row["zipcode"]));

    }
    
    //load toppings table
    $json_url = "taco_truck_menu.json";
    $json = file_get_contents($json_url);
    $data = json_decode($json,true);
    foreach($data as $menu){
        foreach($menu as $type=>$value){
            foreach($value as $index){
                $query = "INSERT INTO toppings (topping_name,topping_heat,topping_price,topping_type)VALUES (?,?,?,?)";
                $results = $dbInstance->insert($query, array($index["name"], $index["heatRating"],$index["price"],$type));
            }
        }
    }
    
    //load users table
    $row = 0;
    $csv_data = array();
    if (($handle = fopen("Users.csv", "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            $num = count($data);
            //echo "<p> $num fields in line $row: <br /></p>\n";
            $row++;
            for ($c=0; $c < $num; $c++) {
                $csv_data[$row][$c] = $data[$c];
               // echo $csv_data[$row][$c] . "<br />\n";
            }
        }
        fclose($handle);
    }
    foreach($csv_data as $row){
            if($row[0]!="UserId"){
                echo($row[1]);
                $query = "INSERT INTO users (user_id,fName,lName,credit_provider,credit_number,email,pswd)VALUES (?,?,?,?,?,?,?)";
                $results = $dbInstance->insert($query, array($row[0],$row[1],$row[2],$row[6],$row[7],$row[3],$row[4]));
            }
    }
    
    //load Orders table
    $row = 0;
    $csv_data = array();
    if (($handle = fopen("Orders.csv", "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            $num = count($data);
            //echo "<p> $num fields in line $row: <br /></p>\n";
            $row++;
            for ($c=0; $c < $num; $c++) {
                $csv_data[$row][$c] = $data[$c];
                echo $csv_data[$row][$c] . "<br />\n";
            }
        }
        fclose($handle);
    }
    date_default_timezone_set('UTC');
    foreach($csv_data as $row){
            if($row[0]!="OrderId"){
                echo($row[1]);
                echo($row[2]);
                $query = "INSERT INTO orders (order_id,user_id,order_dates)VALUES (?,?,?)";
                $results = $dbInstance->insert($query, array($row[0],$row[1],date('Y-m-d h:i:s', strtotime($row[2]))));
            }
    }

    //load Tacos table
        $row = 0;
    $csv_data = array();
    if (($handle = fopen("OrderItem.csv", "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            $num = count($data);
            //echo "<p> $num fields in line $row: <br /></p>\n";
            $row++;
            for ($c=0; $c < $num; $c++) {
                $csv_data[$row][$c] = $data[$c];
                echo $csv_data[$row][$c] . "<br />\n";
            }
        }
        fclose($handle);
    }
    foreach($csv_data as $row){
            if($row[0]!="OrderItemId"){
                //echo($row[1]);
                //echo($row[2]);
                //$query = "INSERT INTO tacos (taco_id,quantity,order_id)VALUES (?,?,?)";
                //$results = $dbInstance->insert($query, array($row[0],$row[2],$row[1]));
            }
    }
   
    //load TacoToppings table
        $row = 0;
    $csv_data = array();
    if (($handle = fopen("OrderItemDetails.csv", "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            $num = count($data);
            //echo "<p> $num fields in line $row: <br /></p>\n";
            $row++;
            for ($c=0; $c < $num; $c++) {
                $csv_data[$row][$c] = $data[$c];
                echo $csv_data[$row][$c] . "<br />\n";
            }
        }
        fclose($handle);
    }
    foreach($csv_data as $row){
            if($row[0]!="OrderItemDetailId"){
                echo($row[1]);
                echo($row[2]);
                $query = "INSERT INTO tacoToppings (tacoTopping_id,topping_id,taco_id)VALUES (?,?,?)";
                $results = $dbInstance->insert($query, array($row[0],$row[2],$row[1]));
            }
    }

    
    
    

?>
