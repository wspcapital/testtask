-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Nov 23, 2015 at 08:37 AM
-- Server version: 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `testtask`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_state_id` int(11) NOT NULL,
  `city_name` varchar(256) NOT NULL DEFAULT '',
  `city_lg_id` int(11) NOT NULL,
  `city_active` tinyint(1) NOT NULL DEFAULT '1',
  `city_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `CityName` (`city_name`,`city_state_id`),
  KEY `State` (`city_state_id`),
  KEY `Lang` (`city_lg_id`),
  KEY `StateLang` (`city_state_id`,`city_lg_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `city_state_id`, `city_name`, `city_lg_id`, `city_active`, `city_created`) VALUES
(1, 3, 'Запорожье', 4, 1, '2015-11-23 07:27:43'),
(2, 3, 'Львiв', 5, 1, '2015-11-23 07:27:55'),
(3, 3, 'Харьков', 4, 1, '2015-11-23 07:28:21'),
(4, 3, 'Мiргород', 5, 1, '2015-11-23 07:28:43'),
(5, 2, 'Nova Scotia', 2, 1, '2015-11-23 07:32:51'),
(6, 2, ' Ontario', 1, 1, '2015-11-23 07:33:19'),
(7, 2, 'Saskatchewan', 3, 1, '2015-11-23 07:34:50');

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `lg_id` int(11) NOT NULL AUTO_INCREMENT,
  `lg_name` varchar(256) NOT NULL DEFAULT '',
  `lg_brief` varchar(5) NOT NULL,
  `lg_active` tinyint(1) NOT NULL DEFAULT '1',
  `lg_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`lg_id`),
  UNIQUE KEY `LangName` (`lg_name`),
  UNIQUE KEY `LangBrief` (`lg_brief`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`lg_id`, `lg_name`, `lg_brief`, `lg_active`, `lg_created`) VALUES
(1, 'English', 'en', 1, '2015-11-23 07:21:48'),
(2, 'French', 'fr', 1, '2015-11-23 07:22:13'),
(3, 'German', ' dr', 1, '2015-11-23 07:23:06'),
(4, 'Русский', 'ру', 1, '2015-11-23 07:23:53'),
(5, 'Украiнський', 'укр', 1, '2015-11-23 07:24:16');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `state_id` int(11) NOT NULL AUTO_INCREMENT,
  `state_name` varchar(256) NOT NULL DEFAULT '',
  `state_iso` varchar(3) NOT NULL DEFAULT '',
  `state_lg_id` int(11) NOT NULL,
  `state_active` tinyint(1) NOT NULL DEFAULT '1',
  `state_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`state_id`),
  UNIQUE KEY `StateName` (`state_name`),
  UNIQUE KEY `StateIso` (`state_iso`),
  KEY `Lang` (`state_lg_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`state_id`, `state_name`, `state_iso`, `state_lg_id`, `state_active`, `state_created`) VALUES
(1, 'Great Briten', 'GB', 1, 1, '2015-11-23 07:25:16'),
(2, 'Canada', 'CAN', 2, 1, '2015-11-23 07:26:13'),
(3, 'Украiна', 'UA', 5, 1, '2015-11-23 07:26:46'),
(4, 'Россия', 'RU', 4, 1, '2015-11-23 07:27:18');
