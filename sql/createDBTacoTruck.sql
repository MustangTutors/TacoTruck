CREATE DATABASE TacoTruck;
USE TacoTruck;

CREATE TABLE `users` (
  `user_id` int(20) NOT NULL,
  `fName` varchar(30) NOT NULL,
  `lName` varchar(30) NOT NULL,
  `credit_provider` varchar(30) NOT NULL,
  `credit_number` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `pswd` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `locations` (
  `loc_name` varchar(30) NOT NULL,
  `loc_id` int(20) NOT NULL,
  `city` varchar(30) NOT NULL,
  `street` varchar(30) NOT NULL,
  `zip` int(20) NOT NULL,
  `state` varchar(30) NOT NULL,
  PRIMARY KEY (`loc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `toppings` (
  `topping_id` int(20) NOT NULL,
  `topping_name` varchar(30) NOT NULL,
  `topping_heat` int(20) NOT NULL,
  `topping_price` int(20) NOT NULL,
  `topping_type` int(20) NOT NULL,
  PRIMARY KEY (`topping_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `orders` (
  `order_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `order_dates` datetime NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tacos` (
  `taco_id` int(20) NOT NULL,
  `quantity` int(20) NOT NULL,
  `order_id` int(20) NOT NULL,
  PRIMARY KEY (`taco_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `tacos_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tacoToppings` (
  `tacoTopping_id` int(20) NOT NULL,
  `topping_id` int(20) NOT NULL,
  `taco_id` int(20) NOT NULL,
  PRIMARY KEY (`tacoTopping_id`),
  KEY `topping_id` (`topping_id`),
  KEY `taco_id` (`taco_id`),
  CONSTRAINT `tacotoppings_ibfk_1` FOREIGN KEY (`topping_id`) REFERENCES `toppings` (`topping_id`),
  CONSTRAINT `tacotoppings_ibfk_2` FOREIGN KEY (`taco_id`) REFERENCES `tacos` (`taco_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
