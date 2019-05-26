-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 26, 2019 at 03:56 PM
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
  `img_name` varchar(50) NOT NULL,
  `age` varchar(50) NOT NULL,
  `weight` varchar(50) NOT NULL,
  `fur` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `boxes`
--

INSERT INTO `boxes` (`id_box`, `name`, `price`, `description`, `animal`, `img_name`, `age`, `weight`, `fur`) VALUES
(1, 'Mousseline de courgettes', 20, 'Une délicieuse recette pour chat à base de courgettes.', 'chat', 'test2.jpg', 'adulte', 'surpoids', 'long'),
(2, 'produit de test', 50, 'un produit pour tester', 'chat', 'test1.jpg', 'bebe', 'normal', 'court'),
(3, 'Lasagnes', 30, 'Un délicieux plat de lasagnes italiennes pour votre chat', 'chat', 'test2.jpg', 'senior', 'surpoids', 'long');

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
(2, 'commentaire de test', 4, 1),
(3, 'excellent produit', 4, 1),
(4, 'j\'adore', 4, 1),
(5, 'j\'adore', 4, 1),
(6, 'j\'adore', 4, 1),
(7, 'j\'adore', 4, 1),
(8, 'j\'adore', 4, 1),
(9, 'j\'adore', 4, 1),
(10, 'j\'adore', 4, 1),
(11, 'j\'adore', 4, 1),

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
(1, 'courgettes'),
(2, 'farine'),
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
(16, 'ordered', 4, 1, 'adresse', '2019-05-24', NULL, 1),
(17, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(18, 'ordered', 4, 2, 'adresse', '2019-05-26', NULL, 1),
(19, 'ordered', 4, 2, 'adresse', '2019-05-26', NULL, 1),
(20, 'ordered', 4, 2, 'adresse', '2019-05-26', NULL, 1),
(21, 'ordered', 4, 2, 'adresse', '2019-05-26', NULL, 1),
(22, 'ordered', 4, 2, 'adresse', '2019-05-26', NULL, 1),
(23, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(24, 'ordered', 4, 2, 'adresse', '2019-05-26', NULL, 1),
(25, 'ordered', 4, 2, 'adresse', '2019-05-26', NULL, 1),
(26, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(27, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(28, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(29, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(30, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(31, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(32, 'ordered', 4, 1, '', '2019-05-26', NULL, 1),
(33, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(34, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(35, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(36, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(37, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(38, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(39, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1),
(40, 'ordered', 4, 1, 'adresse', '2019-05-26', NULL, 1);

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
  `difficulty` int(11) NOT NULL,
  `id_box` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id_recipe`, `name`, `steps`, `preparation_time`, `cook_time`, `difficulty`, `id_box`) VALUES
(1, 'Régime pour chat en 5 étapes', 'Laver, égoutter et essuyer les courgettes sans les éplucher\r\nOuvrer chaque courgette en deux dans le sens de la longueur (en 4 longueurs si elle est moyenne), puis couper dans l’autre sens chaque longueur pour obtenir des carrés que je place dans un plat en verre pour micro-ondes.\r\nCouvre le plat en verre avec un couvercle ou un film alimentaire puis le place au micro-ondes, puis sélectionne la puissance maximale et mets à cuire entre 6 et 10 minutes (selon la puissance maximale d’un appareil à un autre). Pour ma part, en vérifiant plusieurs fois en cours de cuisson les morceaux de courgettes avec la pointe d’un couteau, ensuite définir la cuisson à 10 minutes. La courgette doit être tendre et fondante mais pas trop cuite. Il est important de garder le jus de la cuisson dans un verre à part.\r\nVerser dans un mixeur pour réaliser la mousseline de courgettes. Si elle vous semble trop pâteuse ou épaisse, ajoutez le jus pour la rendre plus liquide.\r\nVerser trois bonnes cuillères à soupe (25 g) pour le test et mets le reste en bocaux de verre (refermer aussitôt le bocal, le laisserai refroidir avant de le mettre au congélateur –sortir chaque bocal la veille pour le servir le lendemain après 20 secondes de chauffe au micro-ondes). Il est important de tiédir jusqu’à 38° la mousseline car c’est reproduire la chaleur de la proie lorsque notre chat l’a capturée.', '20min', '10min', 0, 1),
(2, 'test', '1. premiere etape\r\n2. deuxieme etape\r\n3. troisieme etape', '10h', '2h', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `recipe_has_ingredients`
--

CREATE TABLE `recipe_has_ingredients` (
  `ingredient_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `quantity` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recipe_has_ingredients`
--

INSERT INTO `recipe_has_ingredients` (`ingredient_id`, `recipe_id`, `quantity`) VALUES
(1, 1, '500g');

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
(1, 1),
(2, 1);

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
(1, 'micro-ondes'),
(2, 'mixeur');

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
  MODIFY `id_box` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id_feedback` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id_ingredient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id_recipe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id_tool` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
