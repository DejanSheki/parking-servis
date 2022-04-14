-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 07, 2022 at 01:12 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parkingservis`
--

-- --------------------------------------------------------

--
-- Table structure for table `01users`
--

CREATE TABLE `01users` (
  `userID` int(6) NOT NULL,
  `userName` varchar(30) CHARACTER SET ascii NOT NULL,
  `userPassw` varchar(30) CHARACTER SET ascii NOT NULL,
  `userFLname` varchar(50) NOT NULL,
  `userRank` int(1) NOT NULL,
  `userTitle` varchar(30) CHARACTER SET ascii NOT NULL,
  `userMail` varchar(50) CHARACTER SET ascii NOT NULL,
  `userInfoType` int(1) NOT NULL,
  `userInfoTime` time NOT NULL,
  `userActive` int(1) NOT NULL DEFAULT '1',
  `userCreatedByID` int(6) NOT NULL,
  `userCreatedTD` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `01users`
--

INSERT INTO `01users` (`userID`, `userName`, `userPassw`, `userFLname`, `userRank`, `userTitle`, `userMail`, `userInfoType`, `userInfoTime`, `userActive`, `userCreatedByID`, `userCreatedTD`) VALUES
(1, 'dejan000', 'sddsa', 'Dejan  Lukic', 0, 'SSuperAdmin', 'dejan@gmailo.clm', 0, '18:38:00', 0, 1, '2022-02-28 17:34:31'),
(2, 'slaven', 'dasdas', 'Slaven Atlic', 0, 'SSuperAdmin', 'slaven@gmail.com', 2, '18:26:00', 1, 1, '2022-02-28 17:35:47'),
(3, 'dejan000', 'dadad', 'adada', 0, 'SSuperAdmin', 'saff@fsfs.ccc', 2, '18:39:00', 0, 1, '2022-02-28 17:38:06'),
(4, 'dejan', 'grdete644', 'Dejan  Lukic', 0, 'SSuperAdmin', 'dejan@gmailo.clm', 0, '18:35:00', 1, 1, '2022-02-28 19:18:36'),
(5, 'dejan000', 'sdad', 'Dejan Lukić', 0, 'SSuperAdmin', 'dejan@gmailo.clm', 2, '18:34:00', 1, 1, '2022-02-28 19:23:09'),
(6, 'slaven', 'slkjfhlesfj', 'Slaven Atlić', 0, 'SSuperAdmin', 'slaven@gmail.com', 2, '18:31:00', 1, 1, '2022-02-28 20:49:53'),
(7, 'petra', 'asfsafsaf', 'Petra Vragolov', 3, 'User', 'dejan.sheki.lukic@gmail.com', 3, '04:26:00', 1, 1, '2022-03-01 00:20:37'),
(8, 'dejan000', 'adada', 'Dejan Lukić', 0, 'SSuperAdmin', 'dspcontroldejan@gmail.com', 0, '21:05:00', 1, 1, '2022-03-01 18:55:03'),
(9, 'dejan99', 'savsav', 'Dox Prascic', 3, 'User', 'dox@gmail.com', 3, '09:30:00', 1, 1, '2022-03-02 03:02:28'),
(10, 'Dox', 'skfjslf', 'Dox Prasac', 1, 'SuperAdmin', 'dox@gmail.com', 1, '09:00:00', 1, 1, '2022-03-02 18:16:32'),
(11, 'slaven', 'dsg', 'Slaven Atlic', 2, 'Admin', 'slaven@gmail.com', 3, '17:05:00', 1, 1, '2022-03-02 18:18:47'),
(12, 'dejan000', 'sfds', 'Dejan Lukić', 0, 'SSuperAdmin', 'dejan@gmailo.clm', 0, '04:54:00', 1, 1, '2022-03-02 18:21:50'),
(13, 'sheki', 'dox', 'Dejan  Lukic', 3, 'User', 'dspcontroldejan@gmail.com', 3, '04:26:00', 1, 1, '2022-03-06 04:07:31');

-- --------------------------------------------------------

--
-- Table structure for table `03locations`
--

CREATE TABLE `03locations` (
  `locID` int(6) NOT NULL,
  `locType` int(1) NOT NULL,
  `locNumber` int(6) NOT NULL,
  `locSname` varchar(50) CHARACTER SET ascii NOT NULL,
  `locLname` varchar(100) CHARACTER SET ascii NOT NULL,
  `locDesc` varchar(100) CHARACTER SET ascii NOT NULL,
  `locLat` decimal(11,7) NOT NULL,
  `locLong` decimal(11,7) NOT NULL,
  `locActive` int(1) NOT NULL,
  `locCreatedByID` int(6) NOT NULL,
  `locCreatedTD` datetime NOT NULL,
  `locDisable` int(1) NOT NULL,
  `locDisabledByID` int(6) NOT NULL,
  `locDisabledTD` datetime NOT NULL,
  `locDisableDesc` varchar(100) CHARACTER SET ascii NOT NULL,
  `locEventMask` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `03locations`
--

INSERT INTO `03locations` (`locID`, `locType`, `locNumber`, `locSname`, `locLname`, `locDesc`, `locLat`, `locLong`, `locActive`, `locCreatedByID`, `locCreatedTD`, `locDisable`, `locDisabledByID`, `locDisabledTD`, `locDisableDesc`, `locEventMask`) VALUES
(1, 1, 1, 'Vuk', 'Vukov spomenik', 'nista', '44.8053750', '20.4787222', 1, 1, '2022-02-28 19:08:37', 0, 0, '2022-02-28 19:08:37', 'nista', 0),
(2, 0, 2, 'SLA1', 'Slavija 1', 'Neki opis, bla bla...', '44.8027777', '20.4670715', 1, 1, '2022-03-02 02:26:24', 0, 0, '2022-03-02 02:26:24', ' ', 0);

-- --------------------------------------------------------

--
-- Table structure for table `04events`
--

CREATE TABLE `04events` (
  `eventID` int(6) NOT NULL,
  `eventName` varchar(50) CHARACTER SET ascii NOT NULL,
  `eventDesc` varchar(100) CHARACTER SET ascii NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `05evhistory`
--

CREATE TABLE `05evhistory` (
  `evHistID` int(11) NOT NULL,
  `evHistEventID` int(6) NOT NULL,
  `evHistLocID` int(6) NOT NULL,
  `evHistDT` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fiksnipodaci`
--

CREATE TABLE `fiksnipodaci` (
  `lokacija` int(5) UNSIGNED ZEROFILL NOT NULL,
  `datum` date NOT NULL,
  `vreme` time NOT NULL,
  `oznaka` varchar(50) NOT NULL,
  `kapacitet` int(11) NOT NULL,
  `slobodna_mesta` int(5) UNSIGNED ZEROFILL NOT NULL,
  `naziv_lokacije` varchar(100) NOT NULL,
  `koordinate` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fiksnipodaci`
--

INSERT INTO `fiksnipodaci` (`lokacija`, `datum`, `vreme`, `oznaka`, `kapacitet`, `slobodna_mesta`, `naziv_lokacije`, `koordinate`) VALUES
(00001, '2022-01-23', '09:29:13', 'Vuk', 119, 00055, 'Vukov spomennik', '[20.4787222, 44.805375]'),
(00002, '2022-02-16', '23:41:42', 'Sla', 110, 00055, 'Slaviija 1', '[20.4670715, 44.8027777]'),
(00003, '2022-01-26', '19:41:13', 'MGM', 310, 00025, 'MGM', '[20.4543147, 44.8294684]'),
(00004, '2022-01-23', '09:29:13', 'CvP', 81, 00025, 'Cvetkova pijaca', '[20.5074789, 44.7920255]'),
(00005, '2022-01-23', '10:35:32', 'Mk', 114, 00025, 'Mali Kalemegdan', '[20.4517813, 44.8247871]'),
(00006, '2022-01-23', '10:35:32', 'Dg', 389, 00025, 'Donji grad', '[20.4485677, 44.8197023]'),
(00007, '2022-02-06', '23:23:02', 'Pol', 55, 00033, 'Politika', '[20.4642176, 44.8157945]'),
(00008, '2022-02-06', '23:25:40', 'Kam', 95, 00065, 'Kamenicka', '[20.4546951, 44.8112347]'),
(00009, '2022-02-06', '23:27:32', 'Vis', 48, 00034, 'Viška', '[20.4753767, 44.8009539]'),
(00010, '2022-02-06', '23:31:59', 'Cuk', 79, 00058, 'Čukarica', '[20.4158052, 44.7824492]'),
(00011, '2022-02-06', '23:38:30', 'TTC', 245, 00177, 'Terminal Cargo', '[20.3602493, 44.8270881]'),
(00012, '2022-02-06', '23:53:22', 'BV', 351, 00237, 'Baba Višnjina', '[20.4741386, 44.8015516]'),
(00013, '2022-02-24', '00:28:40', 'TRO', 550, 00055, 'Trosarina', '[20.483198, 44.761827]');

-- --------------------------------------------------------

--
-- Table structure for table `podaci`
--

CREATE TABLE `podaci` (
  `datum` date NOT NULL,
  `vreme` time NOT NULL,
  `lokacija` int(5) UNSIGNED ZEROFILL NOT NULL,
  `slobodna_mesta` int(5) UNSIGNED ZEROFILL NOT NULL,
  `naziv_lokacije` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `podaci`
--

INSERT INTO `podaci` (`datum`, `vreme`, `lokacija`, `slobodna_mesta`, `naziv_lokacije`) VALUES
('2022-01-21', '19:26:45', 00001, 00100, 'VMA'),
('2022-01-27', '23:28:13', 00003, 00222, 'Vracar'),
('2022-01-27', '23:28:13', 00004, 00444, 'Banjica'),
('2022-01-27', '23:31:20', 00002, 00333, 'Topcider'),
('2022-01-27', '23:31:20', 00005, 00222, 'Zvezda'),
('2022-01-27', '23:31:20', 00006, 00666, 'Trosarina'),
('2022-01-28', '12:59:02', 00001, 00200, 'VMA'),
('2022-01-28', '12:59:02', 00001, 00300, 'VMA'),
('2022-01-28', '12:59:02', 00001, 00400, 'VMA'),
('2022-01-28', '13:08:54', 00001, 00050, 'VMA'),
('2022-01-28', '13:51:30', 00001, 01000, 'VMA'),
('2022-01-28', '19:46:06', 00001, 00350, 'VMA'),
('2022-02-01', '01:38:40', 00001, 00222, 'VMA'),
('2022-02-01', '16:30:18', 00001, 00333, 'VMA'),
('2022-02-02', '20:43:43', 00001, 00555, 'VMA'),
('2022-02-23', '01:44:51', 00001, 00155, 'test'),
('2022-02-23', '00:45:31', 00002, 00002, 'testiramo');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `test1` int(1) NOT NULL,
  `test2` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`test1`, `test2`) VALUES
(1, 'testiramo'),
(1, 'noviTest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `01users`
--
ALTER TABLE `01users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `03locations`
--
ALTER TABLE `03locations`
  ADD PRIMARY KEY (`locID`);

--
-- Indexes for table `04events`
--
ALTER TABLE `04events`
  ADD PRIMARY KEY (`eventID`);

--
-- Indexes for table `05evhistory`
--
ALTER TABLE `05evhistory`
  ADD PRIMARY KEY (`evHistID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `01users`
--
ALTER TABLE `01users`
  MODIFY `userID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `03locations`
--
ALTER TABLE `03locations`
  MODIFY `locID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `04events`
--
ALTER TABLE `04events`
  MODIFY `eventID` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `05evhistory`
--
ALTER TABLE `05evhistory`
  MODIFY `evHistID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
