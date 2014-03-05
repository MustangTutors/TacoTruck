<?php 
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

function getToppingsByType($type){
    $topp = new Toppings();
    //if($type=="filling" || $type=="fillings") $type="type";
    $topp->getToppingByToppingType($type);
}

function validateUser(){
    $user = new User();
    $email = $_REQUEST['email'];
    $password = $_REQUEST['password'];
    session_start();
    //Note: May not be the correct way to do this
    if($user->getUserByEmailAndPassword($email,$password)) $_SESSION['user_id']=$user->$user_id;
    echo json_encode($user);
}

function logOut(){
	session_start();
	session_destroy();
}

function getUserInfo(){
     $user=new User();
     $user->getUserByID($_SESSION['user_id']);
     echo '{"id":"'.$user->user_id.'","name":"'.$user->fName.' '.$user->lName.',"credit_provider":"'.$user->credit_provider.'","credit_number":"'.$user->credit_number.'"}';

}

function getLastOrder($userId){	
	
   $order = new Order();
   $order->getLastOrderByUserId($userId);
}
function getLocations(){
    $location = new Locations();
    $location->getLocations();
}

function addUser(){
    $id = User::addUser($_POST['fName'], $_POST['lName'], 
        $_POST['creditProvider'], $_POST['creditCardNum'], $_POST['email'],
        $_POST['password']);
    echo json_encode($id);
 }

function addOrder(){
    $user_id = $_SESSION['user_id'];
    $order = new Order();
    $order_data = json_decode($_POST['order']);
    $quantities;
    $iter_quant = 0;
    $toppings;
    $iter_top=0;
    foreach($order_data['order'] as $taco){
        $quantities[$iter_quant]=$taco['quantity'];
        $iter_top=0;
        foreach($taco['toppings'] as $topping_id){
            $toppings[$iter_quant][$iter_top]=$topping_id['topping_id'];
            $iter_top++;
        }
        $iter_quant++;
    }
    $order->addOrder($user_id,$quantities,$toppings);    
}

function getAllToppings(){
    $topp = new Toppings();
    $topp->getAllToppings();
}




?>
