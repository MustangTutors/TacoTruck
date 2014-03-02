<?php
function get_ToppingInfo(toppingID,toppingName,heat,price,type)
{

$sql toppinginfo = "SELECT tacoTopping_id, topping_name, topping_heat, topping_price, topping_type from tacos natural join tacoToppings natural join toppings LIMIT 0, 30 ";
echo toppinginfo;
}

?>
