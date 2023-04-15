-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: shoeware
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `brand_id` (`brand_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Nike Air Max 270','The Nike Air Max 270 delivers fresh style and visible cushioning under every step. Updated for modern comfort, it nods to the original, 1991 Air Max 180 with its exaggerated tongue top and heritage tongue logo.',150.00,'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSsb_187vH3y4wHb-n3uN4pIPx4uOek-mg20MxscWbfFFHJ4QKMe6qImGSRSgp8OPjBt2ZoyMHWaTkHL3qKqyOzbi0fHsuOWtVjbA0oGqzm6P4hYaOc0FU3vcy_NVxVqYoGYWw&usqp=CAc',1,1),(2,'Adidas Ultraboost 21','The Ultraboost 21 is the latest evolution of the iconic Ultraboost franchise. It features a new, more responsive midsole and a redesigned upper that provides a more comfortable and supportive fit.',180.00,'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT-kDybkoP1MhyqIYXSbP_CCy4dqbZuod6kQ0EF18dEOF28ktH_3EqzFPgxvt3t1-yd93I1O-0FJtEudpvg-S5IGGomWkbEbYZftMkxRIIvfUCfNXcNKG_enU_hKGLcbD3y-Q&usqp=CAc',2,1),(3,'Puma Future Z 1.1','The Puma Future Z 1.1 is designed for agile playmakers who demand the ultimate in speed and control. It features a lightweight, flexible upper and a responsive outsole that delivers explosive acceleration and quick cuts.',120.00,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQEIJu4rnVAVdRfuwmjjaW7__gqn9yqj8Enw&usqp=CAU',3,3),(4,'Reebok Classic Leather','The Reebok Classic Leather is a timeless sneaker that combines retro style with modern comfort. It features a soft leather upper and a cushioned midsole that provides all-day comfort.',70.00,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzT5p8iuyjYi66wOLlZ5_cPZ-zXClt7KwF4Q&usqp=CAU',4,4),(9,'New Balance 990v5','The New Balance 990v5 is a comfortable and stylish running shoe.',175.00,'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQUNI4Cq0kDLJAhAThnPCeLE7xItmATvxzy1JW69t3WY8WnjRG1l9P5Pi2KOMDrqrzTSrNKz8zTJq1LqxRerVYKjwJBJ24rPD9-obU98vZv9xFdPK07Cs0lHr9UENABXG8xCg&usqp=CAc',5,1),(10,'Nike Air Force 1','The Nike Air Force 1 is a classic sneaker with a timeless design.',90.00,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEYLLUNCao4B67DScG9G8UyobE5yZafm-AyQ&usqp=CAU',1,5),(11,'Adidas NMD_R1','The Adidas NMD_R1 is a comfortable and stylish sneaker with a modern design.',130.00,'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/d55a5bfc35404d228b4eacb800d333c4_9366/Giay_NMD_R1_DJen_GZ7922_01_standard.jpg',2,5),(12,'Puma RS-X3','The Puma RS-X3 is a retro-inspired sneaker with a chunky design.',110.00,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnbg3As96seo0h4LPpJY19OIO9EPqiMLY4qaw3kN2IdlRiSM0fTipYEW2iVRokc7jG1Xg&usqp=CAU',3,5),(13,'Reebok Nano 9','The Reebok Nano 9 is a high-performance training shoe designed for crossfit.',130.00,'https://www.reebok.com/us/nano-9-shoes/DV6342.html',4,5),(14,'New Balance Fresh Foam 1080v11','The New Balance Fresh Foam 1080v11 is a comfortable and responsive running shoe.',150.00,'https://www.newbalance.com/pd/fresh-foam-1080v11/M1080V11.html',5,1),(15,'Nike Zoom Freak 2','The Nike Zoom Freak 2 is a basketball shoe designed for Giannis Antetokounmpo.',130.00,'https://www.nike.com/t/zoom-freak-2-basketball-shoe-5JzJZz/CJ0955-001',1,2),(16,'Adidas Harden Vol. 5','The Adidas Harden Vol. 5 is a basketball shoe designed for James Harden.',130.00,'https://www.adidas.com/us/harden-vol.-5-shoes/FZ1070.html',2,2),(17,'Puma Future Z 1.2','The Puma Future Z 1.2 is a soccer cleat designed for speed and control.',220.00,'https://us.puma.com/en/us/pd/future-z-1.2-fg%2Fag-mens-soccer-cleats/106202.html',3,3),(18,'Reebok Club C 85','The Reebok Club C 85 is a classic tennis shoe with a retro design.',75.00,'https://www.reebok.com/us/club-c-85-shoes/DV6435.html',4,4),(19,'New Balance 327','The New Balance 327 is a stylish lifestyle sneaker with a vintage look.',100.00,'https://www.newbalance.com/pd/327/MS327LAA.html',5,5);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-15 14:39:18
