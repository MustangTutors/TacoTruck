<?php
	include "phpapi.php";
	$phpInit= new phpapi();
	$fName =$_POST['first_name'];
	$lName =$_POST['last_name'];
	$email =$_POST['email'];
	$password =$_POST['password'];
	$CCP =$_POST['credit_provider'];
	$CCN =$_POST['credit_number'];
	echo ($phpInit->get_UserInfo($fName,$lName,$email,$password,$CCP,$CCN));
?>
