-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 24, 2019 at 01:32 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `projetTransversal`
--

-- --------------------------------------------------------

--
-- Table structure for table `boxes`
--

CREATE TABLE `boxes` (
  `id_box` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL,
  `animal` varchar(25) DEFAULT NULL,
  `img_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `boxes`
--

INSERT INTO `boxes` (`id_box`, `name`, `price`, `description`, `animal`, `img_name`) VALUES
(1, 'test', 20, 'Box de test.', 'chien', 'test1.jpg'),
(2, 'produit de test', 50, 'un produit pour tester', 'chat', 'test2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id_feedback` int(11) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `box_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id_feedback`, `content`, `user_id`, `box_id`) VALUES
(1, 'test', 7, 1),
(2, 'commentaire de test', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id_ingredient` int(11) NOT NULL,
  `ingredient` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id_ingredient`, `ingredient`) VALUES
(1, 'farine'),
(2, 'ingredientDeTest'),
(3, 'ingredientDeTest');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `box_id` int(11) NOT NULL,
  `adress` text NOT NULL,
  `date_of_order` date NOT NULL,
  `date_of_deliver` date DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id_order`, `status`, `user_id`, `box_id`, `adress`, `date_of_order`, `date_of_deliver`, `quantity`) VALUES
(1, 'ordered', 2, 1, 'chez moi', '2019-04-08', NULL, 1),
(2, 'ordered', 2, 1, '35 rue chez moi', '2019-04-08', NULL, 1),
(3, 'ordered', 3, 1, 'adresse de test', '2019-04-24', NULL, 1),
(4, 'ordered', 7, 1, 'adresse de test', '2019-05-24', NULL, 1),
(5, 'ordered', 7, 1, 'adresse de test', '2019-05-24', NULL, 1),
(6, 'ordered', 7, 1, 'adresse de test', '2019-05-24', NULL, 1),
(7, 'ordered', 7, 1, 'adresse de test', '2019-05-24', NULL, 1),
(8, 'ordered', 4, 2, 'adresse', '2019-05-24', NULL, 1),
(9, 'ordered', 4, 1, 'adresse', '2019-05-24', NULL, 1),
(10, 'ordered', 4, 1, '24 rue Henri Martin', '2019-05-24', NULL, 1),
(11, 'ordered', 4, 1, 'adresse', '2019-05-24', NULL, 1),
(12, 'ordered', 4, 1, 'adresse', '2019-05-24', NULL, 1),
(13, 'ordered', 4, 1, '24 rue Henri Martin', '2019-05-24', NULL, 1),
(14, 'ordered', 4, 1, 'adresse', '2019-05-24', NULL, 1),
(15, 'ordered', 4, 1, '', '2019-05-24', NULL, 1),
(16, 'ordered', 4, 1, 'adresse', '2019-05-24', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id_recipe` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `steps` longtext NOT NULL,
  `preparation_time` varchar(10) NOT NULL,
  `cook_time` varchar(10) NOT NULL,
  `difficulty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id_recipe`, `name`, `steps`, `preparation_time`, `cook_time`, `difficulty`) VALUES
(1, 'test', '1. premiere etape\r\n2. deuxieme etape\r\n3. troisieme etape', '10h', '2h', 0);

-- --------------------------------------------------------

--
-- Table structure for table `recipe_has_ingredients`
--

CREATE TABLE `recipe_has_ingredients` (
  `ingredient_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recipe_has_ingredients`
--

INSERT INTO `recipe_has_ingredients` (`ingredient_id`, `recipe_id`, `quantity`) VALUES
(1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `recipe_has_tools`
--

CREATE TABLE `recipe_has_tools` (
  `tool_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recipe_has_tools`
--

INSERT INTO `recipe_has_tools` (`tool_id`, `recipe_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id_token` int(11) NOT NULL,
  `token` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id_token`, `token`) VALUES
(2, '7z5dRbI09N4rhfbMIJ68Yo1l6Rtnp2kMoZs56lTXZmEqV'),
(1, 'husEXpLj9tqjVVb9MEkWPbwxABJwCPf5cBJxfIOLJ122g');

-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE `tools` (
  `id_tool` int(11) NOT NULL,
  `tool` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`id_tool`, `tool`) VALUES
(1, 'fouet');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `points` int(11) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `email`, `password`, `points`, `admin`, `name`) VALUES
(2, 'testUpdate@email.com', 'sha1$8a774da8$1$21ba24b4b67bd451ab15739f80319827c1fe4898', NULL, 0, 'test'),
(4, 'test2@email.com', 'sha1$6f40baca$1$d6e2e6672582598ff74143a1e80cff31b2b10230', NULL, 1, 'test'),
(5, 'test3@email.com', 'sha1$406dc695$1$0b0af95c4756786beb5a0f7606f71e9b8dfe7307', NULL, 0, 'test'),
(6, 'test4@email.com', 'sha1$3dc7dcfa$1$5b1026fb27430c62c5ee41f789495e1e780b1f74', NULL, 0, 'test'),
(7, 'test5@email.com', 'sha1$6f6edf82$1$c8923cefacd34956d5b3f352463f0fbcd2c3aefe', NULL, 0, 'test'),
(14, 'test6@email.com', 'sha1$2b36a70f$1$2b3ef7db63f29f8ee47733607d45abe74d82b75f', NULL, 0, 'test');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boxes`
--
ALTER TABLE `boxes`
  ADD PRIMARY KEY (`id_box`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id_feedback`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id_ingredient`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id_recipe`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id_token`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id_tool`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boxes`
--
ALTER TABLE `boxes`
  MODIFY `id_box` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id_feedback` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id_ingredient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id_recipe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id_token` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id_tool` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
