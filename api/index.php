<?php 
include "../init.php";

require 'Slim/Slim.php';
    
$app = new Slim();

$app->get('/toppings/','getAllToppings');
$app->get('/toppings/:type','getToppingsByType');   
$app->post('/users/login','validateUser');          
$app->get('/users/lastOrder/:userId','getLastOrder');   
$app->get('/locations','getLocations');             
$app->post('/orders/addOrder','addOrder' );         
$app->post('/AddNewUser','addUser');                
$app->run();

function getToppingsByType($type){
    $topp = new Toppings();
    $topp->getToppingByToppingType($type);
}

function validateUser(){
    $user = new User();
    $email = $_REQUEST['email'];
    $password = $_REQUEST['password'];
    $user->getUserByEmailAndPassword($email,$password);
    echo json_encode($user);
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
    $user_id = 1;
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
