<?
    include "phpapi.php";
    $phpInit = new phpapi();
    
    $toppingType = $_GET['toppingID'];
    echo($phpInit->get_ToppingInfo($toppingType));
?>
