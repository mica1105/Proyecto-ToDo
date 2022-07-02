-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-06-2022 a las 06:28:11
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdexpress`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(1, 'Pruebas'),
(3, 'Personal'),
(4, 'Familiar'),
(5, 'Laboral');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id`, `estado`) VALUES
(1, 'Sin Resolver'),
(2, 'Resolviendo'),
(3, 'Resuelta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `fechaCreacion` date NOT NULL,
  `fechaResolucion` date DEFAULT NULL,
  `descripcion` varchar(200) NOT NULL,
  `fechaLimite` date NOT NULL,
  `prioridad` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `lista` int(11) DEFAULT NULL,
  `usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `item`
--

INSERT INTO `item` (`id`, `titulo`, `fechaCreacion`, `fechaResolucion`, `descripcion`, `fechaLimite`, `prioridad`, `estado`, `lista`, `usuario`) VALUES
(7, 'probando', '2022-06-13', '2022-06-15', 'probando insertar item', '2022-06-15', 1, 3, 10, 1),
(8, 'hola', '2022-06-13', '2022-06-15', 'saludar', '2022-06-16', 1, 3, 10, 1),
(9, 'item1', '2022-06-14', '2022-06-14', 'probando insertar item', '2022-06-15', 1, 3, 13, 2),
(13, 'Terminar Todo', '2022-06-17', '2022-06-17', 'Terminar con el modulo de Usuario', '2022-06-17', 3, 3, 18, 3),
(14, 'Iniciar Curso de Python', '2022-06-17', NULL, 'Registrarse y comenzar curso de Python ', '2022-06-20', 2, 1, 20, 1),
(15, 'Averiguar Presupuestos de salones', '2022-06-17', NULL, 'Ir a la higuera, club gepu, salon de jubilados y de la policia', '2022-06-24', 2, 1, 21, 1),
(16, 'Presupuesto de catering', '2022-06-17', NULL, 'buscar empresas de catering y realizar presumuesto si lo hacemos nosotros', '2022-06-30', 2, 1, 21, 1),
(17, 'Denuncia de Extravio de DNI', '2022-06-17', NULL, 'debo llevar partida de nacimiento y sellado de la policia', '2022-06-24', 3, 1, 22, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista`
--

CREATE TABLE `lista` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `fechaCreacion` date NOT NULL,
  `fechaResolucion` date DEFAULT NULL,
  `estado` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lista`
--

INSERT INTO `lista` (`id`, `titulo`, `fechaCreacion`, `fechaResolucion`, `estado`, `usuario`, `categoria`) VALUES
(10, 'mi nueva lista', '2022-06-12', '2022-06-15', 3, 1, 1),
(13, 'Mi  Nueva Lista', '2022-06-13', '2022-06-14', 3, 2, 1),
(18, 'Personal', '2022-06-17', '2022-06-17', 3, 3, 1),
(20, 'Estudio', '2022-06-17', NULL, 1, 1, 3),
(21, 'Organizar el cumple de mamá', '2022-06-17', NULL, 1, 1, 4),
(22, 'Tramites', '2022-06-17', NULL, 1, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prioridad`
--

CREATE TABLE `prioridad` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `prioridad`
--

INSERT INTO `prioridad` (`id`, `descripcion`) VALUES
(1, 'Baja'),
(2, 'Media'),
(3, 'Alta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `descripcion`) VALUES
(1, 'Admin'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `creacion` date NOT NULL,
  `modificacion` date NOT NULL,
  `rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `email`, `password`, `creacion`, `modificacion`, `rol`) VALUES
(1, 'Micaela Alejandra Dure', 'amarillolatino.mika@gmail.com', '$2b$15$/VGLRSiDEIgLZXPPrsy4o.ul4gxvVyElvAZlNVUTnQEliVi7kdiOu', '2022-06-07', '2022-06-16', 2),
(2, 'Micaela Alejandra Dure', 'mika.dure1105@gmail.com', NULL, '2022-06-08', '2022-06-08', 2),
(3, 'Admin', 'admin@admin.com', '$2b$10$tXMX9LK2Ps8oqRiHMJiDdeD4TQitwBa2M9Mj1vYobB6fXK/CG/lbK', '2022-06-13', '2022-06-17', 1),
(4, 'Ezequiel Paez ', 'oscar@gmail.com', '$2b$10$2dgkaQbRJR9mlP/IfWaOs.FT1B3QbkbKCBwjrosKgRqYqfsTR0LeS', '2022-06-17', '2022-06-17', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_listaId` (`lista`),
  ADD KEY `fk_prioridadId` (`prioridad`),
  ADD KEY `fk_estado` (`estado`),
  ADD KEY `ite_usu_fk` (`usuario`);

--
-- Indices de la tabla `lista`
--
ALTER TABLE `lista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`usuario`),
  ADD KEY `estado_fk` (`estado`),
  ADD KEY `fk_categoria` (`categoria`);

--
-- Indices de la tabla `prioridad`
--
ALTER TABLE `prioridad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rol` (`rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `lista`
--
ALTER TABLE `lista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `prioridad`
--
ALTER TABLE `prioridad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `fk_estado` FOREIGN KEY (`estado`) REFERENCES `estado` (`id`),
  ADD CONSTRAINT `fk_listaId` FOREIGN KEY (`lista`) REFERENCES `lista` (`id`),
  ADD CONSTRAINT `fk_prioridadId` FOREIGN KEY (`prioridad`) REFERENCES `prioridad` (`id`),
  ADD CONSTRAINT `ite_usu_fk` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `lista`
--
ALTER TABLE `lista`
  ADD CONSTRAINT `estado_fk` FOREIGN KEY (`estado`) REFERENCES `estado` (`id`),
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`id`),
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_rol` FOREIGN KEY (`rol`) REFERENCES `rol` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
