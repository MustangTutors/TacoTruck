<?php
	include "phpapi.php";
	$phpInit= new phpapi();
	$userID =$_GET['userID'];
	echo ($phpInit->get_UserInfo($userID));
?>
