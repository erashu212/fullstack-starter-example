
--
-- Table structure for table `tm_user`
--

DROP TABLE IF EXISTS `tm_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tm_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `tm_task`
--

DROP TABLE IF EXISTS `tm_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tm_task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `due` datetime NOT NULL,
  `priority` enum('P1','P2','P3','P4','P5') NOT NULL,
  `status` enum('Open','In Progress','In Verification','Closed') NOT NULL,
  `reporter` int DEFAULT NULL,
  `assignee` int NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_task_assignee_idx` (`assignee`),
  KEY `user_task_reporter_idx` (`reporter`),
  CONSTRAINT `user_task_assignee` FOREIGN KEY (`assignee`) REFERENCES `tm_user` (`id`),
  CONSTRAINT `user_task_reporter` FOREIGN KEY (`reporter`) REFERENCES `tm_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
