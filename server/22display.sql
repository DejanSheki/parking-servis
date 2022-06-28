-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 04, 2022 at 09:14 PM
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
-- Table structure for table `22display`
--

CREATE TABLE `22display` (
  `dispID` int(11) NOT NULL,
  `zoneShort` varchar(5) CHARACTER SET utf8mb4 NOT NULL,
  `lokacija` int(3) UNSIGNED ZEROFILL NOT NULL,
  `disp1tip` varchar(10) NOT NULL,
  `disp2tip` varchar(10) NOT NULL,
  `disp1opis` varchar(100) NOT NULL,
  `disp2opis` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `22display`
--

INSERT INTO `22display` (`dispID`, `zoneShort`, `lokacija`, `disp1tip`, `disp2tip`, `disp1opis`, `disp2opis`) VALUES
(1, 'Sd001', 001, 'reg', 'inv', 'Njegoševa |', 'inv'),
(2, 'Sd002', 002, 'reg', 'reg', 'Njegoševa ->', 'Njegoševa <-'),
(3, 'Sd003', 003, 'reg', 'x', 'Prote Mateje ->', 'x'),
(4, 'Sd004', 003, 'reg', 'x', 'Prote Mateje <-', 'x'),
(5, 'Sd005', 004, 'reg', 'inv', 'Njegoševa |', 'inv'),
(6, 'Sd006', 004, 'reg', 'inv', 'Njegoševa |', 'inv'),
(7, 'Sd007', 005, 'reg', 'reg', 'Njegoševa ->', 'Njegoševa <-'),
(8, 'Sd008', 006, 'reg', 'reg', 'Alekse Nenadovića |', 'Alekse Nenadovića |'),
(9, 'Sd009', 007, 'reg', 'reg', 'Smiljanićeva |', 'Smiljanićeva |'),
(10, 'Sd010', 008, 'reg', 'reg', 'Njegoševa ->', 'Njegoševa <-'),
(11, 'Sd011', 009, 'reg', 'inv', 'Kneginje Zorke -><-', 'inv'),
(12, 'Sd012', 009, 'reg', 'reg', 'Njegoseva |', 'Njegoseva |'),
(13, 'Sd013', 010, 'reg', 'reg', 'Njegoseva ->', 'Njegoseva <-'),
(14, 'Sd014', 010, 'reg', 'reg', 'Kneginje Zorke |', 'Kneginje Zorke |'),
(15, 'Sd015', 011, 'reg', 'inv', 'Kneginje Zorke -><-', 'inv'),
(16, 'Sd016', 011, 'reg', 'reg', 'Njegoseva |', 'Njegoseva |'),
(17, 'Sd017', 012, 'reg', 'reg', 'Njegoseva ->', 'Njegoseva <-'),
(18, 'Sd018', 012, 'reg', 'reg', 'Kneginje Zorke |', 'Kneginje Zorke |'),
(19, 'Sd019', 013, 'reg', 'x', 'Molerova ->', 'x'),
(20, 'Sd020', 014, 'reg', 'x', 'Molerova <-', 'x'),
(21, 'Sd021', 015, 'reg', 'reg', 'Njegoseva ->', 'Njegoseva <-'),
(22, 'Sd022', 016, 'reg', 'reg', 'Njegoseva ->', 'Njegoseva <-'),
(23, 'Sd023', 017, 'reg', 'x', 'Njegoseva |', 'x'),
(24, 'Sd024', 017, 'reg', 'x', 'Koce Kapetana <-', 'x'),
(25, 'Sd025', 018, 'reg', 'inv', 'Koce Kapetana ->', 'inv'),
(26, 'Sd026', 018, 'reg', 'x', 'Njegoseva |', 'x'),
(27, 'Sd027', 019, 'reg', 'reg', 'Njegoseva ->', 'Njegoseva <-'),
(28, 'Sd028', 020, 'reg', 'x', 'Baba Visnjina |', 'x'),
(29, 'Sd029', 021, 'reg', 'reg', 'Kursulina ->', 'Kursulina <-'),
(30, 'Sd030', 021, 'reg', 'reg', 'Njegoseva <-', 'Kursulina |'),
(32, 'Sd032', 022, 'reg', 'reg', 'Kursulina |', 'Kursulina |'),
(33, 'Sd033', 023, 'reg', 'reg', 'Koce Kapetana |', 'Koce Kapetana |'),
(34, 'Sd034', 024, 'reg', 'reg', 'Kneginje Zorke |', 'Kneginje Zorke |'),
(35, 'Sd035', 025, 'reg', 'reg', 'Alekse Nenadovica |', 'Alekse Nenadovica |'),
(36, 'Sd036', 026, 'reg', 'x', 'Prote Mateje |', 'x'),
(37, 'Sd037', 027, 'reg', 'reg', 'Smiljaniceva |', 'Smiljaniceva |'),
(38, 'Sd038', 028, 'reg', 'reg', 'Kneginje Zorke |', 'Kneginje Zorke |'),
(39, 'Sd039', 029, 'reg', 'x', 'Molerova |', 'x'),
(40, 'Sd040', 030, 'reg', 'x', 'Baba Visnjina |', 'x'),
(41, 'Sd041', 031, 'reg', 'inv', 'Molerova |', 'inv'),
(42, 'Sd042', 032, 'reg', 'inv', 'Krunska |', 'inv'),
(43, 'Sd043', 033, 'reg', 'x', 'Prote Mateje |', 'x'),
(44, 'Sd044', 034, 'reg', 'inv', 'Brace Nedica |', 'inv'),
(45, 'Sd045', 035, 'reg', 'reg', 'Krunska ->', 'Krunska <-'),
(46, 'Sd046', 036, 'reg', 'inv', 'Kumanovska |', 'inv'),
(47, 'Sd047', 037, 'reg', 'reg', 'Krunska ->', 'Krunska <-'),
(48, 'Sd048', 038, 'reg', 'inv', 'Kneginje Zorke |', 'inv'),
(49, 'Sd049', 039, 'reg', 'x', 'Krunska |', 'x'),
(50, 'Sd050', 040, 'reg', 'inv', 'Kneginje Zorke |', 'inv'),
(51, 'Sd051', 041, 'reg', 'inv', 'Krunska |', 'inv'),
(52, 'Sd052', 042, 'reg', 'reg', 'Krunska ->', 'Krunska <-'),
(53, 'Sd053', 043, 'reg', 'reg', 'Koce Kapetana |', 'Kicevska <-'),
(54, 'Sd054', 044, 'reg', 'x', 'Krunska |', 'x'),
(55, 'Sd055', 045, 'reg', 'reg', 'Kicevska |', 'Hadzi Prodanova ->'),
(56, 'Sd056', 046, 'reg', 'x', 'Patrijarha Gavrila |', 'x'),
(57, 'Sd057', 047, 'reg', 'x', 'Kicevska ->', 'x'),
(58, 'Sd058', 048, 'reg', 'x', 'Molerova |', 'x'),
(59, 'Sd059', 049, 'reg', 'reg', 'Kneginje Zorke ->', 'Kneginje Zorke <-'),
(60, 'Sd060', 050, 'reg', 'reg', 'Molerova  |', 'Hadzi Djerina ->'),
(61, 'Sd061', 051, 'reg', 'x', 'Hadzi Djerina |', 'x'),
(62, 'Sd062', 052, 'reg', 'inv', 'Resavska <-', 'inv'),
(63, 'Sd063', 053, 'reg', 'inv', 'Resavska ->', 'inv'),
(64, 'Sd064', 054, 'reg', 'inv', 'Svetozara Markovica |', 'inv'),
(65, 'Sd065', 055, 'reg', 'inv', 'Desanke Maksimovic <-', 'inv'),
(66, 'Sd066', 055, 'reg', 'x', 'Krunska |', 'x'),
(67, 'Sd067', 056, 'reg', 'x', 'Krunska <-', 'x'),
(68, 'Sd068', 056, 'reg', 'inv', 'Svetozara Markovica |', 'inv'),
(69, 'Sd069', 057, 'reg', 'x', 'Misarska ->', 'x'),
(70, 'Sd070', 058, 'reg', 'inv', 'Resavska <-', 'inv'),
(71, 'Sd071', 058, 'reg', 'inv', 'Resavska ->', 'inv'),
(72, 'Sd072', 058, 'reg', 'inv', 'Krunska |', 'inv'),
(73, 'Sd073', 059, 'reg', 'inv', 'Krunska ->', 'inv'),
(74, 'Sd074', 060, 'reg', 'x', 'Njegoseva |', 'x'),
(75, 'Sd075', 061, 'reg', 'inv', 'Resavska |', 'inv'),
(76, 'Sd076', 062, 'reg', 'x', 'Njegoseva <-', 'x'),
(77, 'Sd077', 063, 'reg', 'x', 'Svetozara Markovica |', 'x'),
(78, 'Sd078', 064, 'reg', 'x', 'Njegoseva |', 'x'),
(79, 'Sd079', 065, 'reg', 'inv', 'Kralja Milutina |', 'inv'),
(80, 'Sd080', 066, 'reg', 'inv', 'Kralja Milutina |', 'inv'),
(81, 'Sd081', 067, 'reg', 'x', 'Svetozara Markovica |', 'x'),
(82, 'Sd082', 068, 'reg', 'inv', 'Resavska |', 'inv'),
(83, 'Sd083', 069, 'reg', 'inv', 'Svetozara Markovica |', 'inv');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `22display`
--
ALTER TABLE `22display`
  ADD PRIMARY KEY (`dispID`),
  ADD UNIQUE KEY `zoneShort` (`zoneShort`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
