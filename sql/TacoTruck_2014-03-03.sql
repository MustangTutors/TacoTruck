# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.16)
# Database: TacoTruck
# Generation Time: 2014-03-03 23:28:07 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table locations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
  `loc_name` varchar(30) NOT NULL,
  `loc_id` int(20) NOT NULL AUTO_INCREMENT,
  `city` varchar(30) NOT NULL,
  `street` varchar(30) NOT NULL,
  `zip` int(20) NOT NULL,
  `state` varchar(30) NOT NULL,
  PRIMARY KEY (`loc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;

INSERT INTO `locations` (`loc_name`, `loc_id`, `city`, `street`, `zip`, `state`)
VALUES
	('Klyde Warren Park',1,'Dallas','2012 Woodall Rodgers Fwy',75201,'TX'),
	('Southern Methodist Unversity',2,'Dallas','6425 Boaz Lane',75205,'TX'),
	('Addison Circle Park',3,'Addison','Addison Circle',75001,'TX'),
	('Truck Yard',4,'Dallas','5624 Sears St',75206,'TX'),
	('Deep Ellum',5,'Dallas','2630 Commerce St',75226,'TX');

/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `order_id` int(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(20) NOT NULL,
  `order_dates` datetime NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;

INSERT INTO `orders` (`order_id`, `user_id`, `order_dates`)
VALUES
	(1,1,'2014-12-22 05:57:19'),
	(2,1,'2015-01-14 06:56:35'),
	(3,2,'2013-12-23 12:50:40'),
	(4,2,'2013-04-27 08:41:09'),
	(5,3,'2014-02-13 06:33:08'),
	(6,3,'2013-10-06 02:07:47'),
	(7,4,'2014-12-09 01:25:38'),
	(8,4,'2013-05-11 04:03:37'),
	(9,5,'2014-09-19 03:17:08'),
	(10,5,'2014-06-20 09:29:33'),
	(11,6,'2013-03-25 01:03:52'),
	(12,6,'2014-01-20 12:59:20'),
	(13,7,'2014-09-27 12:52:10'),
	(14,7,'2015-01-08 03:47:51'),
	(15,8,'2013-10-19 08:53:41'),
	(16,8,'2014-07-29 10:15:40'),
	(17,9,'2014-07-09 07:47:40'),
	(18,9,'2014-02-27 07:49:39'),
	(19,10,'2014-05-23 04:23:46'),
	(20,10,'2013-05-22 05:16:24'),
	(21,1,'2014-07-14 02:44:12'),
	(22,2,'2013-09-25 12:17:35'),
	(23,3,'2014-02-21 09:49:30'),
	(24,4,'2014-05-08 02:34:09'),
	(25,5,'2014-10-28 07:26:35'),
	(26,6,'2013-05-22 12:51:56'),
	(27,7,'2014-02-28 12:10:06'),
	(28,8,'2014-01-16 02:24:49'),
	(29,9,'2013-03-21 09:28:10');

/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tacos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tacos`;

CREATE TABLE `tacos` (
  `taco_id` int(20) NOT NULL AUTO_INCREMENT,
  `quantity` int(20) NOT NULL,
  `order_id` int(20) NOT NULL,
  PRIMARY KEY (`taco_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `tacos_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tacos` WRITE;
/*!40000 ALTER TABLE `tacos` DISABLE KEYS */;

INSERT INTO `tacos` (`taco_id`, `quantity`, `order_id`)
VALUES
	(1,1,1),
	(2,2,1),
	(3,1,1),
	(4,2,1),
	(5,2,2),
	(6,2,2),
	(7,2,2),
	(8,3,2),
	(9,1,3),
	(10,1,3),
	(11,1,3),
	(12,1,3),
	(13,1,4),
	(14,1,4),
	(15,1,4),
	(16,3,4),
	(17,2,5),
	(18,1,5),
	(19,2,5),
	(20,3,5);

/*!40000 ALTER TABLE `tacos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tacoToppings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tacoToppings`;

CREATE TABLE `tacoToppings` (
  `tacoTopping_id` int(20) NOT NULL AUTO_INCREMENT,
  `topping_id` int(20) NOT NULL,
  `taco_id` int(20) NOT NULL,
  PRIMARY KEY (`tacoTopping_id`),
  KEY `topping_id` (`topping_id`),
  KEY `taco_id` (`taco_id`),
  CONSTRAINT `tacotoppings_ibfk_1` FOREIGN KEY (`topping_id`) REFERENCES `toppings` (`topping_id`),
  CONSTRAINT `tacotoppings_ibfk_2` FOREIGN KEY (`taco_id`) REFERENCES `tacos` (`taco_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tacoToppings` WRITE;
/*!40000 ALTER TABLE `tacoToppings` DISABLE KEYS */;

INSERT INTO `tacoToppings` (`tacoTopping_id`, `topping_id`, `taco_id`)
VALUES
	(1,1,1),
	(2,5,1),
	(3,16,1),
	(4,2,2),
	(5,6,2),
	(6,9,2),
	(7,16,2),
	(8,3,3),
	(9,7,3),
	(10,20,3),
	(11,41,3),
	(12,4,4),
	(13,8,4),
	(14,18,4),
	(15,4,5),
	(16,8,5),
	(17,32,5),
	(18,11,5),
	(19,30,5),
	(20,36,5),
	(21,14,5),
	(22,40,5),
	(23,3,6),
	(24,7,6),
	(25,9,6),
	(26,16,6),
	(27,18,6),
	(28,30,6),
	(29,31,6),
	(30,40,6),
	(31,41,6),
	(32,2,7),
	(33,6,7),
	(34,40,7),
	(35,41,7),
	(36,42,7),
	(37,1,8),
	(38,5,8),
	(39,9,8),
	(40,14,8),
	(41,38,8),
	(42,1,9),
	(43,5,9),
	(44,26,9),
	(45,33,9),
	(46,39,9),
	(47,2,10),
	(48,5,10),
	(49,11,10),
	(50,10,10),
	(51,14,10),
	(52,18,10),
	(53,29,10),
	(54,30,10),
	(55,31,10),
	(56,32,10),
	(57,3,11),
	(58,5,11),
	(59,38,11),
	(60,30,11),
	(61,4,12),
	(62,6,12),
	(63,9,12),
	(64,16,12),
	(65,17,12),
	(66,44,12),
	(67,4,13),
	(68,6,13),
	(69,16,13),
	(70,3,14),
	(71,5,14),
	(72,10,14),
	(73,13,14),
	(74,20,14),
	(75,30,14),
	(76,2,15),
	(77,7,15),
	(78,25,15),
	(79,32,15),
	(80,33,15),
	(81,1,16),
	(82,8,16),
	(83,9,16),
	(84,21,16),
	(85,35,16),
	(86,1,17),
	(87,8,17),
	(88,22,17),
	(89,30,17),
	(90,31,17),
	(91,2,18),
	(92,8,18),
	(93,3,19),
	(94,7,19),
	(95,33,19),
	(96,4,20),
	(97,6,20),
	(98,30,20),
	(99,31,20),
	(100,32,20),
	(101,33,20),
	(102,39,20),
	(103,40,20);

/*!40000 ALTER TABLE `tacoToppings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table toppings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `toppings`;

CREATE TABLE `toppings` (
  `topping_id` int(20) NOT NULL AUTO_INCREMENT,
  `topping_name` varchar(30) NOT NULL,
  `topping_heat` int(20) DEFAULT NULL,
  `topping_price` float NOT NULL,
  `topping_type` varchar(30) NOT NULL,
  PRIMARY KEY (`topping_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `toppings` WRITE;
/*!40000 ALTER TABLE `toppings` DISABLE KEYS */;

INSERT INTO `toppings` (`topping_id`, `topping_name`, `topping_heat`, `topping_price`, `topping_type`)
VALUES
	(1,'Steak',NULL,1,'type'),
	(2,'Chicken',NULL,0.75,'type'),
	(3,'Carnitas',NULL,1,'type'),
	(4,'Veggie',NULL,0.5,'type'),
	(5,'Flour',NULL,0.25,'tortillas'),
	(6,'Cayenne',NULL,0.35,'tortillas'),
	(7,'Wheat',NULL,0.35,'tortillas'),
	(8,'Spinach',NULL,0.3,'tortillas'),
	(9,'Cilantro Rice',NULL,0.25,'rice'),
	(10,'Spanish Rice',NULL,0.25,'rice'),
	(11,'Queso Fresco',NULL,0.5,'cheese'),
	(12,'Cheddar/Jack Mix',NULL,0.35,'cheese'),
	(13,'Monterrey Jack',NULL,0.35,'cheese'),
	(14,'Refried Beans',NULL,0.35,'beans'),
	(15,'Whole Pinto Beans',NULL,0.25,'beans'),
	(16,'Black Beans',NULL,0.1,'beans'),
	(17,'Hot Tomatillo',3,0,'sauces'),
	(18,'Death',4,0,'sauces'),
	(19,'Fresh Lime Juice',1,0,'sauces'),
	(20,'Bad Ass BBQ',2,0,'sauces'),
	(21,'Mild Tomatillo',2,0,'sauces'),
	(22,'Ranch',1,0,'sauces'),
	(23,'No Sauce',0,0,'sauces'),
	(24,'Habenero',3,0,'sauces'),
	(25,'Salsa',2,0,'sauces'),
	(26,'Ancho',1,0,'sauces'),
	(27,'Tomatillo',1,0,'sauces'),
	(28,'Herb Vinigrette',1,0,'sauces'),
	(29,'Poblano Salsa',NULL,0,'vegetables'),
	(30,'Roasted Garlic',NULL,0,'vegetables'),
	(31,'Peppers/Onions',NULL,0,'vegetables'),
	(32,'Red Onion',NULL,0,'vegetables'),
	(33,'Jalapenos',NULL,0,'vegetables'),
	(34,'Pico de Gallo',NULL,0,'vegetables'),
	(35,'White Onion',NULL,0,'vegetables'),
	(36,'Tomatoes',NULL,0,'vegetables'),
	(37,'Cilantro',NULL,0,'vegetables'),
	(38,'Tortilla Strips',NULL,0,'vegetables'),
	(39,'Lettuce',NULL,0,'vegetables'),
	(40,'X - Extra Meat/Veggies',NULL,1,'extras'),
	(41,'Sour Cream',NULL,0.75,'extras'),
	(42,'Guacamole',NULL,0.75,'extras'),
	(43,'Queso',NULL,0.5,'extras'),
	(44,'Sliced Avocado',NULL,0.75,'extras'),
	(45,'Bacon',NULL,0.5,'extras');

/*!40000 ALTER TABLE `toppings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(20) NOT NULL AUTO_INCREMENT,
  `fName` varchar(30) NOT NULL,
  `lName` varchar(30) NOT NULL,
  `credit_provider` varchar(30) NOT NULL,
  `credit_number` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `pswd` varchar(200) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`user_id`, `fName`, `lName`, `credit_provider`, `credit_number`, `email`, `pswd`)
VALUES
	(1,'Bobby','Dickerson','Visa','4581172250956295','BobbyDDickerson@armyspy.com','oom1duH0quei'),
	(2,'John','Horan','Visa','4833554465137429','JohnMHoran@cuvox.de','uM0zohG5'),
	(3,'Lula','Benjamin','Visa','4173199486453080','LulaTBenjamin@einrot.com','ohF0zooquu1'),
	(4,'Franklin','Hills','Visa','4937182773835950','FranklinIHills@rhyta.com','eeWahXo5ee'),
	(5,'Samuel','Blevins','American Express','379823789416348','SamuelCBlevins@cuvox.de','TaeXo2OoV8u'),
	(6,'William','Raymond','American Express','345650978113056','WilliamRRaymond@cuvox.de','Jiech8aiCh'),
	(7,'Janice','Robertson','American Express','375651072455574','JaniceRRobertson@superrito.com','kohgae4OeGh'),
	(8,'Lashawn','Lambert','American Express','342691124360073','LashawnTLambert@einrot.com','Lu0icho2yee'),
	(9,'Vanessa','Seals','Mastercard','5513462587501850','VanessaGSeals@dayrep.com','tooWee3Mo6ae'),
	(10,'Bethany','Tong','Mastercard','5345523630534291','BethanyETong@dayrep.com','ahC7Veigha');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
