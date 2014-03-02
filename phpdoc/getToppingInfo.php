<?
    include "phpapi.php";
    $phpInit = new phpapi();
    
    $toppingType = $_GET['toppingType'];
    echo($phpInit->get_ToppingInfo($toppingType));
?>
