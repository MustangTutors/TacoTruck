<?php 
include "../init.php";
require 'Slim/Slim.php';
    
$app = new Slim();

$app->get('/toppings/:type','getToppingsByType');
$app->get('/users/login','validateUser');
$app->get('/users/lastOrder/:userId','getLastOrder');
$app->get('/locations','getLocations');
//add order 
//add user
//check currently logged in
$app->run();

function getToppingsByType($type){
    $topp = new Toppings();
    $topp->getToppingByToppingType($type);
}

function validateUser($email,$password){
    $user = new User();
    $email = $_POST['email'];
    $password = $_POST['password'];
    $user->getUserByEmailAndPassword($email,$password);
}
function getLastOrder($userId){
    $order = new Order();
    $order->getLastOrderByUserId($userId);
    
}
/*function getOrdersByUserId($user_id){
    $order = new Order();
    $order->getOrdersByUserId($user_id);
}*/
function getLocations(){
    $location = new Locations();
    $location->getLocations();
}


?>
