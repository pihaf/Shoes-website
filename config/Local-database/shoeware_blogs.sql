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
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `post_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `body` text NOT NULL,
  `blog_url` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,'The Hottest Sneaker Trends for 2023','2023-04-21 16:15:58','Get ready to step up your sneaker game with these hot new trends.','https://www.harpersbazaar.com/fashion/trends/g41416862/spring-2023-shoe-trends/','http://localhost:3000/resource/Blog/b1.jpg'),(2,'How to Choose the Right Running Shoes','2023-04-21 16:15:58','Choosing the right pair of running shoes can make all the difference in your performance and comfort.','https://blog.rypt.app/lifestyle/choosing-the-right-running-shoes/','https://storage.googleapis.com/ops-shopee-files-live/live/shopee-blog/2021/11/da3e0246-shop-ban-giay-sneaker-uy-tin-tren-shopee.jpg'),(3,'10 Classic Sneakers Every Sneakerhead Should Own','2023-04-21 16:15:58','These classic sneakers are a must-have for any sneaker enthusiast.','https://www.reebok.com/us/blog/525944-10-iconic-sneakers-you-need-right-now','http://localhost:3000/resource/Blog/b3.jpg'),(4,'The Best Shoes for Flat Feet and Overpronation','2023-04-21 16:15:58','If you have flat feet or overpronation, it can be difficult to find shoes that provide the right support and comfort.','https://solebliss.com/blogs/news/best-shoes-for-flat-feet','http://localhost:3000/resource/Blog/b2.jpg'),(5,'How to Clean and Care for Your Leather Shoes','2023-04-21 16:15:58','Proper cleaning and care can help your leather shoes last for years.','https://thehelmclothing.com/blogs/our-thoughts/how-to-care-for-leather-shoes','https://theleatherlaundry.com/blog/wp-content/uploads/2017/05/cherry-1024x613.jpg'),(6,'10 Stylish Sandals for Women','2023-04-21 16:15:58','Stay cool and comfortable this summer with these stylish sandals.','https://anyasreviews.com/10-best-stylish-barefoot-sandals-for-women/','https://nypost.com/wp-content/uploads/sites/2/2021/07/sandals-2.jpg?quality=75&strip=all'),(7,'The Best Shoes for Standing All Day','2023-04-21 16:15:58','If you have a job that requires you to stand for long periods of time, it\'s important to have shoes that provide the right support and cushioning.','https://www.si.com/showcase/fitness/best-shoes-for-standing-all-day','http://localhost:3000/resource/Blog/b4.jpg'),(8,'How to Break in a New Pair of Shoes','2023-04-21 16:15:58','Breaking in a new pair of shoes can be uncomfortable, but it\'s important to do it right to avoid blisters and discomfort.','https://hayden-hill.com/blogs/journal/how-to-break-in-shoes','https://images.squarespace-cdn.com/content/v1/5ab5db3b96e76fecf9ac2a84/1624554994828-P78GHKJ8A66VLEW85KTD/How+to+Break+in+a+New+Pair+of+Running+Shoes+-+Triumph+Physio+and+Wellness.jpg?format=1500w'),(9,'10 Must-Have Shoes for Men','2023-04-21 16:15:58','These versatile shoes are essential for any man\'s wardrobe.','https://www.realmenrealstyle.com/shoes-every-man-own/','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0ILJU9lgRT92GjvT5ZWT9f7b0RT6Qp18m-Q&usqp=CAU'),(10,'The Best Shoes for Plantar Fasciitis','2023-04-21 16:15:58','If you suffer from plantar fasciitis, finding the right pair of shoes can help alleviate pain and discomfort.','https://www.forbes.com/health/healthy-aging/best-shoes-for-plantar-fasciitis/','https://www.verywellhealth.com/thmb/b4NO0JJxLHFbnVO0JfKW9osYqMw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Best-Sneakers-for-Plantar-Fasciitis-VWH-tout-cb09c5b8aeb4461899b6151d3b6b67c3.jpg');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-24  1:03:00
