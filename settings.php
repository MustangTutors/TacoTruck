<?php
//This defines the variables for connecting to the database.
// This is cleaner if you are trying to connect to your local copy of the database you don't have to go find the connection variables everywhere in the code.

$url = ($_SERVER['HTTP_HOST']);
define ("DB_HOST","localhost");
define ("DB_USER","taco");
define ("DB_PASSWORD","taco");
define ("DB_NAME","TacoTruck");/*
 //if it is not local use the settings for the production db
 if(strpos($url,"floccul") !== false){
     define ("DB_HOST","http://tacotruck.floccul.us/");
     define ("DB_USER","taco");
     define ("DB_PASSWORD","taco");
     define ("DB_NAME","TacoTruck");
 }else{
 //if it is local I put my own settings
     define ("DB_HOST","127.0.0.1");
     define ("DB_USER","root");
     define ("DB_PASSWORD","");
     define ("DB_NAME","TacoTruck");
 }*/
?>