<?php 
session_start();
include "../init.php";
include "../library/Order.php";
include "../library/User.php";

require 'Slim/Slim.php';
    
$app = new Slim();

$app->get('/toppings/','getAllToppings');
$app->get('/toppings/:type','getToppingsByType');   
$app->post('/users/login','validateUser');
$app->post('/users/logout','logOut');   
$app->get('/users/info','getUserInfo');       
$app->get('/users/lastOrder/:userId','getLastOrder');   
$app->get('/locations','getLocations');             
$app->post('/orders/addOrder','addOrder' );         
$app->post('/AddNewUser','addUser');                
$app->run();

/**
* Get information on all toppings of a given type
* @param STRING $type The type of ingredient to retrieve information on.     
*/
function getToppingsByType($type){
    $topp = new Toppings();
    //if($type=="filling" || $type=="fillings") $type="type";
    $topp->getToppingByToppingType($type);
}

/**
* Check to see if the email-password combination in the $_POST matches what's in the db and echos the account's data if it does.
*/
function validateUser(){
    $user = new User();
    $email = $_POST['email'];
    $password = $_POST['password'];
    //Note: May not be the correct way to do this
    if($user->getUserByEmailAndPassword($email,$password)) $_SESSION['user_id']=$user->user_id;
    echo json_encode($user);
}

/**
* Ends the session of the currently logged in user.
*/
function logOut(){
	session_destroy();
}

/**
* Retrieves the information of the currently logged in user.
*/
function getUserInfo(){
     $user=new User();
     if(!empty($_SESSION['user_id'])){
        $user->getUserByID($_SESSION['user_id']);
        echo '{"user_id":"'.$user->user_id.'","fName":"'.$user->fName.'","lName":"'.$user->lName.'","credit_provider":"'.$user->credit_provider.'","credit_number":"'.$user->credit_number.'"}';
     }
     else{
        echo 'null';
     }
}

/**
* Get the last order of the specified user.
* @param INT $userID ID of the user whose information will be retrieved.     
*/
function getLastOrder($userId){	
	
   $order = new Order();
   $order->getLastOrderByUserId($userId);
}

/**
* Get information of all truck locations.
*/
function getLocations(){
    $location = new Locations();
    $location->getLocations();
}

/**
* Insert a user into the database with the info stored in $_POST.
*/
function addUser(){
    $id = User::addUser($_POST['fName'], $_POST['lName'], 
        $_POST['creditProvider'], $_POST['creditCardNum'], $_POST['email'],
        $_POST['password']);
    echo json_encode($id);
 }

/**
* Insert an order into the database with the info from the JSON stored in $_POST.
*/
function addOrder(){
    $user_id = $_SESSION['user_id'];
    if (!empty($user_id)) {
        $order = new Order();
        $order_data = json_decode($_POST['order']);
        $quantities;
        $iter_quant = 0;
        $toppings;
        $iter_top=0;
        foreach($order_data->order as $taco){
            $quantities[$iter_quant]=$taco->quantity;
            $iter_top=0;
            foreach($taco->toppings as $topping_id){
                $toppings[$iter_quant][$iter_top]=$topping_id->topping_id;
                $iter_top++;
            }
            $iter_quant++;
        }
        $order->addOrder($user_id,$quantities,$toppings); 
    }
}

/**
* Retrieve information on all toppings in the database.
*/
function getAllToppings(){
    $topp = new Toppings();
    $topp->getAllToppings();
}




?>
