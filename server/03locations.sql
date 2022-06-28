-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: parkingServis
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `03locations`
--

DROP TABLE IF EXISTS `03locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `03locations` (
  `locID` int NOT NULL AUTO_INCREMENT,
  `locType` int NOT NULL,
  `locNumber` int(3) unsigned zerofill DEFAULT NULL,
  `locSname` varchar(50) NOT NULL,
  `locLname` varchar(100) NOT NULL,
  `locDesc` varchar(100) NOT NULL,
  `locDisp1zoneID` int DEFAULT '0',
  `locDisp2zoneID` int DEFAULT '0',
  `locDisp3zoneID` int DEFAULT '0',
  `locDisp4zoneID` int DEFAULT '0',
  `locDisp1value` varchar(3) NOT NULL DEFAULT '---',
  `locDisp2value` varchar(3) NOT NULL DEFAULT '---',
  `locDisp3value` varchar(3) NOT NULL DEFAULT '---',
  `locDisp4value` varchar(3) NOT NULL DEFAULT '---',
  `locLat` decimal(11,7) NOT NULL,
  `locLong` decimal(11,7) NOT NULL,
  `locActive` int NOT NULL DEFAULT '1',
  `locCreatedByID` int NOT NULL,
  `locCreatedTD` datetime NOT NULL,
  `locDisable` int NOT NULL DEFAULT '0',
  `locDisabledByID` int NOT NULL DEFAULT '0',
  `locDisabledTD` datetime DEFAULT NULL,
  `locDisableDesc` varchar(100) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `locEventMask` int NOT NULL DEFAULT '0',
  `locLastCommTD` datetime DEFAULT NULL,
  `locLastPacket` varchar(200) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `locColor` varchar(20) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `locCommInfo` varchar(50) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  PRIMARY KEY (`locID`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `03locations`
--

LOCK TABLES `03locations` WRITE;
/*!40000 ALTER TABLE `03locations` DISABLE KEYS */;
INSERT INTO `03locations` VALUES (1,1,001,'Brankov most -Sajmište','Brankov most kod skretanja za Sajmište iz pravca NGBD','Napomena',19,18,16,15,'Err','Err','Err','Err',40.3878343,20.3864830,1,1,'2022-04-20 21:08:02',0,0,NULL,'null',0,'2022-05-22 21:02:38','97,001,Err,Err,Err,Err,0027,0897,1023,0,0,0,0,0,0700,0600,0500,0000,0,0,0,0000,0,11111,22222,55555,33333,4444444444,5555555555555555555555,111.22x.33x.444,M55A555555555,666,11.0_,4209','null','null'),(2,1,002,'Brankov Most 2 BGD','Brankov most pre skretanja u Crnogorsku iz pravca NGBD','Napomena',9,0,7,0,'000','000','000','000',40.3878343,20.3864830,1,1,'2022-04-20 21:08:48',0,0,NULL,'null',0,'2022-05-23 00:47:30','01,002,000,000,000,000,0444,0666,0777,1,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,55555,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,FDA2',NULL,'null'),(3,1,003,'Velike stepenice - Karadjordjeva','Ugao Velikih stepenica i Karađorđeve','Napomena',5,6,15,0,'000','001','off','off',40.3878343,20.3864830,1,1,'2022-04-20 21:10:03',0,0,NULL,'null',0,'2022-05-20 13:21:26','01,003,000,001,off,off,555,0666,0777,1,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,55555,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,FD0F',NULL,'null'),(4,1,004,'Cara Dušana i Tadeuša Košćuška ka Kalemegdanu','Cara Dušana i Tadeuša Košćuška ka Kalemegdanu','Napomena',0,3,5,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:10:40',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(5,1,005,'Pariska','Pariska preko puta Francuske ambasade','Napomena',6,15,6,24,'011','Err','000','off',40.3878343,20.3864830,1,1,'2022-04-20 21:11:24',0,0,NULL,'null',0,'2022-05-11 04:51:35','01,005,011,Err,000,off,0666,0777,1,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,55555,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,8E27',NULL,'null'),(6,1,006,'Brankova - Carice Milice','Ugao Brankove i Carice Milice ka NBGD','Napomena',6,15,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:11:53',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(7,1,007,'Ugao Cara Dušana i Francuske','Ugao Cara Dušana i Francuske, u Cara Dušana iz pravca Bajlonijeve pijace','Napomena',15,18,5,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:12:27',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(8,1,008,'Despota Stefana - Cvijićeva','Ugao Bulevara Despota Stefana i Cvijićeve u Despota Stefana iz pravca Pančevačkog mosta','Napomena',12,18,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:14:11',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(9,1,009,'Ruzveltova - Kraljice Marije','	Ugao Ruzveltove i Kraljice Marije u Ruzveltovoj iz pravca Cvijićeve','Napomena',1,18,15,0,'11','220','123','0',40.3878343,20.3864830,1,1,'2022-04-20 21:14:38',0,0,NULL,'null',0,'2022-05-05 17:56:32','01,009,011,220,123,000,0555,0666,0777,1,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,37EE',NULL,'null'),(10,1,010,'Bulevar Oslobođenja','Bulevar Oslobođenja pre Slavije iz pravca Autokomande','Napomena',2,17,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:15:05',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(11,1,011,'Bul. kralja Aleksandra - Resavska','Bul. kralja Aleksandra i Resavske iz pravca Takovske','Napomena',17,1,9,11,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:15:30',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(12,1,012,'Bulevar - Taš','Bulevar kralja Aleksandra pre skretanja u Resavsku ka Centru','Napomena',18,17,0,0,'8','220','123','0',40.3878343,20.3864830,1,1,'2022-04-20 21:16:03',0,0,NULL,'null',0,'2022-05-05 17:48:12','01,012,008,220,123,000,0555,0666,0777,1,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,07DC',NULL,'null'),(13,1,013,'Nemanjina - Resavska','Ugao Nemanine i Resavse u Nemanjinoj iz pravca Kneza Miloša','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:16:27',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(14,1,015,'Terazije','Terazije, pre skretanja u Balkansku iz pravca Kolarčeve','Napomena',0,0,0,0,'15','-9','-9','-9',40.3878343,20.3864830,1,1,'2022-04-20 21:16:48',0,0,NULL,'null',0,'2022-04-22 04:38:41','98,015,015,-09,-09,-09,0046,0881,1020,0,0,0,0,0,0700,0600,0500,0000,0,0,0,0000,0,11111,22222,33333,4444444444,5555555555555555555555,111.22x.33x.444,M55A555555555,666,11.0_,AE20',NULL,'null'),(15,1,016,'Sarajevska - Nemanjina','	Ugao Sarejevske i Nemanjine u Sarevskoj iz pravca Mostarske ptetlje','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:17:11',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(16,1,017,'Bulevar - Opština Zvezdara','Bulevar kralja Aleksandra pored opštine Zvezdara ka gradu','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:19:54',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(17,1,018,'Vojvode Dobrnjca','Ugao Despota Stefana i Vojvode Dobrnjca u Despota Stefana ka Pančevačom mostu','Napomena',12,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:20:17',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(18,1,019,'Zemunski put -Karađorđeva','Stari most Zemunski put- Karađorđeva','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:20:37',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(19,1,020,'Vojvode Bojovića','Vojvode Bojovića','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:21:00',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(20,1,021,'Cvetkova pijaca - Ž. Daviovića','Ugao Bulevara Kralja Aleksandra i Živka Davidovića, u u Bul Kralja Aleksandra iz pravca grada','Napomena',4,0,0,0,'11','220','123','0',40.3878343,20.3864830,1,1,'2022-04-20 21:21:19',0,0,NULL,'null',0,'2022-05-05 17:57:41','01,021,011,220,123,000,0555,0666,0777,1,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,ACE6',NULL,'null'),(21,1,022,'Bulevar - V. Kosanovića','Ugao Bulevara Kralja Aleksandra i Dr Velizara Kosanovića, u Bul Kralja Aleksandra iz pravca Kluza','Napomena',4,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:21:50',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(22,1,024,'Savska - Miloša pocerca','	Ugao Savske I Miloša Pocerca, u Savskoj iz pravca Mostarske petlje','Napomena',19,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:22:13',0,0,NULL,'null',0,'2022-05-05 18:00:36','01,024,000,000,000,000,0555,0666,0777,1,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,4DAD',NULL,'null'),(23,1,025,'Zeleni venac - Kraljice Natalije','Ugao Brankove i Kraljice Natalije, u Brankovoj iz pravca Novog Beograda','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:22:34',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(24,1,026,'Mekenzijeva - Kneginja Zorka','Ugao Makenzijeve I Kneginje Zorke, u Makenzijevoj iz pravca ka gradu','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:23:00',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(25,1,027,'Tadeusa Koscuckog i Cara Dusana','Tadeusa Koscuckog i Cara Dusana','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:23:40',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(26,1,028,'Taš - Starine Novaka','Ugao Starine Novak I Bulevara Kralja Aleksandra, u Starine Novak iz pravca Ilije Garašanina','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:24:02',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(27,1,029,'BIGZ','Bulevar vojvode Mišića kod BIGZ-a','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:24:25',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(28,1,030,'Bulevar M. Pupina - M. Popovića','	Bulevar Mihajla Pupina, iz pravca grada pre raskrsnice sa Milentija Popovića','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:24:48',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(29,1,032,'Mileševska - Hadži Ruvimova','	Ugao Mileševske i Hadži Ruvimove iz pravca Žičke','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:25:13',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(30,1,033,'Maksima Gorkog - Kalenićeva','Ugao Maksima Gorkog i Kalenićeve iy pravca Cara Nikolaja','Napomena',9,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:25:43',0,0,NULL,'null',0,'2022-05-03 21:29:37','98,033,033,-09,-09,-09,0045,0880,1020,0,0,0,0,0,0700,0600,0500,0000,0,0,0,0000,0,11111,22222,33333,4444444444,5555555555555555555555,111.22x.33x.444,M55A555555555,666,11.0_,E593',NULL,'null'),(31,1,034,'Mekenzijeva - Smiljanićeva','	Ugao Mekenzijeve i Smiljanićeve iz pravca Slavije','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:26:01',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(32,1,035,'Bulevar - Kneginje Zorke','Ugao Bul. Kralja Aleksandra i Kneginje Zorke iz pravca Ruzveltove','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:26:23',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(33,1,036,'Bulevar - Golsfortijeva','Ugao Bul. Kralja Aleksandra i Golsfortijeve','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:26:52',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(34,1,037,'Nemanjina - Kneza Milosa','Ugao Nemanjine i Kneza Milosa iz pravca Slavije','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:27:29',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(35,1,040,'Bul. Despota Stefana - Dzorza Vasingtona','Ugao bul. Despota Stefana i Dz. Vasingtona iz prvavca Pancevackog mosta','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:27:47',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(36,1,041,'Cvijiceva - Takovska','Ugao Cvijiceve i Takovske iz pravca bul. Despota Stefana','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:28:19',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(37,1,042,'Cvijiceva - Starine Novaka','Cvijiceva, pre raskrsnice sa S.Novaka iz pravca Ruzveltove','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:28:40',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(38,1,043,'Kneza Miloša - Lazarevićeva','Ugao Kneza Miloša i Lazarevićeve iz pravca Nemanjine','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:29:02',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(39,1,044,'Dečanska-Novosti','Dečanska iz pravca Trga Nikole Pašića','Napomena',6,15,7,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:29:25',0,0,NULL,'null',0,'2022-05-05 18:13:27','01,044,000,000,000,000,0555,0666,0777,1,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,2289',NULL,'null'),(40,1,045,'Kirovljeva - Ljeska','Kirovljeva, pre skretanja u Ljesku iz pravca Ade','Napomena',10,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:29:47',0,0,NULL,'null',0,'2022-05-05 18:14:14','01,045,000,000,000,000,0555,0666,0777,1,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,B41B',NULL,'null'),(41,1,046,'Pozeska - Milana Kuca - P. Lekovica','Pozeska i Milana Kuca iz pravca Petra Lekovica','Napomena',10,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:33:27',0,0,NULL,'null',0,'2022-05-05 18:33:50','01,046,000,000,000,000,0555,0666,0777,1,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,0DEC',NULL,'null'),(42,1,047,'Pozeska - Milana Kuca - Ada','Pozeska i Milana Kuca iz pravca Ade','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:34:02',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(43,1,048,'Pop Lukina - Crnogorska','Ugao Pop Lukine i Crnogorske iz pravca Brankovog mosta','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:34:23',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(44,1,049,'Brace Jugovic - Dom JNA','Brace Jugovic, na raskrsnici sa Emilija Joksimovica kod doma JNA iz pravca Makedonske','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:34:43',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(45,1,050,'Kneza Sime Markovica - Pariska','	Ugao Kneza Sime Markovica i Pariske iz pravca Saborne crkve','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:35:02',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(46,1,051,'27. marta - Starine Novaka','Ugao 27. marta i Starine Novaka iz pravca Takovske','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:35:21',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(47,1,052,'Sarajevska - Milosa Pocerca','	Sarajveska, pre skretanja u Milosa Pocerca iz pravca Mostarske petlje','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:35:39',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(48,1,053,'Crnotravska - Bahtijar Vagabzade','Crnotravska i Bahtijar Vagabzade iz pravca Bulevara Oslobodjenja','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:35:57',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(49,1,054,'Bahtijar Vagabzade - Crnotravska','Bahtijar Vagabzade i Crnotravske iz pravca Kanarevog brda','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:36:25',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(50,1,055,'Crnotravska - Veljka Lukica Kurjaka','Crnotravske i Beljka Lukica Kurjaka iz pravca Pinka','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:36:45',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(51,1,056,'Omladinskih brigada - bul. Mihaila Pupina','Omladinskih brigada i Bul. Mihaila Pupina iz pravca Bul. Z. Djindjica','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:37:04',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(52,1,057,'Bul. Zorana Djindjica - Bul. Umetnosti','Bul. Zorana Djindjica posle Bul. Umetnosti iz pravca Spanskih boraca','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:37:31',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(53,1,058,'Bul. Mihaila Pupina iz pravca Opstine','Bul. Mihaila Pupina iz pravca Opstine','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:37:50',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(54,1,059,'Ugao Pariske i Sime Markovica','Ugao Pariske i Sime Markovica iz pravca Karadjordjeve','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:38:08',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(55,1,060,'Ugao Karadjordjeve i Crnogorske','	Ugao Karadjordjeve i Crnogorske iz pravca Nemanjine','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:38:27',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(56,1,061,'Ugao Ruzveltove i Bul. kralja Aleksandra','Ugao Ruzveltove i Bul. kralja Aleksandra iz pravca Kraljice Marije','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:38:59',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(57,1,062,'Ugao Kneza Milosa i Bircaninove','Ugao Kneza Milosa i Bircaninove iz pravca Mostarske petlje','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:39:18',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(58,1,063,'Braće Jugovića Makedonska','Braće Jugović - Makedonska','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:39:35',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(59,1,065,'Nemanjina i Savski trg iz pravca trga Slavija','Nemanjina i Savski trg iz pravca trga Slavija','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:39:56',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(60,1,066,'Brankova - Pop Lukina','Ugao Brankove i Pop Lukine iz pravca Terazijskog tunela','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:40:16',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(61,1,068,'Bul. kralaj Aleksandra - Patrijarha Gavrila','Ugao Bul. kralaj Aleksandra i Patrijarha Gavrila iz pravca Kneginje Zorke','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:40:35',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(62,1,069,'Ugao Kneza Milosa i Nemanjine','Ugao Kneza Milosa i Nemanjine iz pravca Takovske','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:40:54',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(63,1,070,'Karadjordjeva - Hadzi Nikole Zivkovica','Ugao Karadjordjeve i Hadzi Nikole Zivkovica iz pravca Brankovog mosta','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:41:13',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(64,1,071,'Gavrila Principa - Jug Bogdanova','	Ugao Gavrila Principa i Jug Bogdanove iz pravca Brankovog mosta','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:41:33',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(65,1,072,'Batutova - Bul. kralja Aleksandra','Batutova i Bul. kralja Aleksandra iz pravca Dimitrija Tucovica','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:41:52',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(66,1,073,'Bul. kralja Aleksandra - Stanislava Sremcevica','Bul. kralja Aleksandra i Stanislava Sremcevica iz pravca Buk-a','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:42:10',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(67,1,074,'Takovska - Dalmatiinska','Ugao Takovske i Dalmatinske iz pravca Cvijiceve','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:42:28',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(68,1,075,'Starine Novaka - 27 mart','Starine Novaka - 27 mart','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:49:34',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(69,1,076,'Takovska','Takovska preko puta pošte iz pravca Svetogorske','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:50:00',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(70,1,077,'Jurija Gagarina 1','Jurija Gagarina preko puta br 126 pre skretanja u Marka Hristića','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:50:26',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(71,1,078,'Jurija Gagarina 2','	Jurija Gagarina kod broja 12bposle skretanja u Marka Hristića','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:50:46',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(72,1,079,'Španski boraca','UgaoŠpanskih boraca i Bulevara Mihajla Milankovića iz pravca Bul. Zorana Đinđića','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:51:40',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(73,1,080,'Bul. Mihajla Pupina ','Ugao Bul. Mihajla Pupina i Španskih boraca iz pravca Bul. umetnosti','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:52:14',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(74,1,081,'Bulevar Mihajla Pupina - SIV','Bulevar Mihajla Pupina, kod kucnog br. 111 iz pravca Anitfasisticke borbe','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:52:51',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(75,1,082,'Bulevar Nikole Tesle - SIV','Bulevar Nikole Tesle, kod ulaza na parking SIV-a 1','Napomena',0,0,0,0,'0','0','0','0',40.3878343,20.3864830,1,1,'2022-04-20 21:53:25',0,0,NULL,'null',0,NULL,NULL,NULL,'null'),(76,1,088,'TEST','za probe','za testiranja',0,0,0,0,'0','0','0','0',11.3333300,22.5555000,1,2,'2022-04-30 10:57:01',0,0,NULL,NULL,0,NULL,NULL,NULL,NULL),(77,2,001,'sensit 1 proba','sensit 1 proba bla bla','proba',0,0,0,0,'02','02','Er','Er',111.0000000,222.0000000,1,2,'2022-05-05 22:26:53',0,0,NULL,NULL,0,'2022-05-24 05:08:46','99,001,02,02,Er,Er,Er,Er,Er,Er,0045,0881,1020,0,0,0,0,0,0700,0600,0500,0000,0,0,0,0000,0,11111,22222,55555,33333,4444444444,5555555555555555555555,111.22x.33x.444,M55A555555555,666,11.0_,1A93',NULL,NULL),(78,2,001,'sensit 1 proba','sensit 1 proba bla bla','proba',0,0,0,0,'02','02','Er','Er',44.1230000,44.3450000,0,2,'2022-05-05 22:27:41',0,0,NULL,NULL,0,'2022-05-24 05:08:46','99,001,02,02,Er,Er,Er,Er,Er,Er,0045,0881,1020,0,0,0,0,0,0700,0600,0500,0000,0,0,0,0000,0,11111,22222,55555,33333,4444444444,5555555555555555555555,111.22x.33x.444,M55A555555555,666,11.0_,1A93',NULL,NULL),(79,2,002,'test2','test novog upisa','provera ',0,0,0,0,'00','00','00','00',40.3878343,20.3255320,1,1,'2022-05-07 15:51:16',0,0,NULL,'null',0,'2022-05-23 00:53:40','01,002,00,00,00,00,00,00,00,00,999,0666,0777,1,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,55555,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,69E9',NULL,'null');
/*!40000 ALTER TABLE `03locations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-24  5:08:50
