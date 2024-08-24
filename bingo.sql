-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 24-08-2024 a las 23:00:05
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bingo_online`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bingos`
--

DROP TABLE IF EXISTS `bingos`;
CREATE TABLE IF NOT EXISTS `bingos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(200) DEFAULT NULL,
  `card_numbers` json DEFAULT NULL,
  `is_winner` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bingos_per_event`
--

DROP TABLE IF EXISTS `bingos_per_event`;
CREATE TABLE IF NOT EXISTS `bingos_per_event` (
  `id` int NOT NULL,
  `event_id` int DEFAULT NULL,
  `bingo_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bingo_numbers`
--

DROP TABLE IF EXISTS `bingo_numbers`;
CREATE TABLE IF NOT EXISTS `bingo_numbers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  `bingo_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bingo_id` (`bingo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text,
  `date` datetime DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `event_type` varchar(200) DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status` (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `date`, `location`, `event_type`, `state_id`) VALUES
(1, '', 'Esto es una prueba', '2024-01-09 06:00:00', 'No definido', 'Presencial', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events_per_user`
--

DROP TABLE IF EXISTS `events_per_user`;
CREATE TABLE IF NOT EXISTS `events_per_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(200) DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_access_tokens`
--

DROP TABLE IF EXISTS `password_access_tokens`;
CREATE TABLE IF NOT EXISTS `password_access_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tokenable_id` int NOT NULL,
  `tokenable_type` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `token` varchar(200) NOT NULL,
  `abilities` varchar(200) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `last_used_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `token` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` int NOT NULL,
  `tokenable_type` varchar(255) DEFAULT NULL,
  `tokenable_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `abilities` varchar(255) DEFAULT NULL,
  `last_used_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rooms`
--

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event` int NOT NULL,
  `user_id` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event` (`event`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `states`
--

DROP TABLE IF EXISTS `states`;
CREATE TABLE IF NOT EXISTS `states` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `states`
--

INSERT INTO `states` (`id`, `name`) VALUES
(1, 'Activo'),
(2, 'En proceso'),
(3, 'Creado'),
(4, 'Finalizado'),
(5, 'Cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `dni_id` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `role_id` int DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `remember_token` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`dni_id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`dni_id`, `name`, `email`, `role_id`, `password`, `remember_token`) VALUES
('702730905', 'Denny Gutrie', 'dennyg.dev@gmail.com', 1, '12345678', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzAyNzMwOTA1IiwidXNlcl9uYW1lIjoiRGVubnkgR3V0cmllIiwidXNlcl9lbWFpbCI6ImRlbm55Zy5kZXZAZ21haWwuY29tIiwiaWF0IjoxNzI0NTQwMTYxfQ.n-MRwjAuutWp7lJ_C7HvmqL_');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `winners_per_event`
--

DROP TABLE IF EXISTS `winners_per_event`;
CREATE TABLE IF NOT EXISTS `winners_per_event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(200) DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bingos`
--
ALTER TABLE `bingos`
  ADD CONSTRAINT `bingos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`dni_id`);

--
-- Filtros para la tabla `bingo_numbers`
--
ALTER TABLE `bingo_numbers`
  ADD CONSTRAINT `bingo_numbers_ibfk_1` FOREIGN KEY (`bingo_id`) REFERENCES `bingos` (`id`);

--
-- Filtros para la tabla `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`);

--
-- Filtros para la tabla `events_per_user`
--
ALTER TABLE `events_per_user`
  ADD CONSTRAINT `events_per_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`dni_id`),
  ADD CONSTRAINT `events_per_user_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Filtros para la tabla `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`event`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`dni_id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `winners_per_event`
--
ALTER TABLE `winners_per_event`
  ADD CONSTRAINT `winners_per_event_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`dni_id`),
  ADD CONSTRAINT `winners_per_event_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
