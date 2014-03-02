<?php
	include "phpapi.php";
	$phpInit= new phpapi();
	$email =$_POST['email'];
	$password=$_POST['password'];
	echo ($phpInit->verifyUser($email,$password));
?>
