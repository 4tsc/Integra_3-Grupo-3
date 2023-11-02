CREATE DATABASE zafiro;

USE zafiro;

-- Crear la tabla "usuario"
CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY,
    pass VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    asesor BOOLEAN NOT NULL
);

-- Crear la tabla "asesor"
CREATE TABLE asesor (
    id_asesor INT PRIMARY KEY,
    pass VARCHAR(50) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL,
    oficina VARCHAR(50) NOT NULL
);

-- Crear la tabla "horas"
CREATE TABLE horas (
    id_hora INT PRIMARY KEY,
    descripcion VARCHAR(300) NOT NULL,
    hora TIME NOT NULL,
    fecha DATE NOT NULL,
    id_usuario INT,
    id_asesor INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_asesor) REFERENCES asesor(id_asesor)
);

-- Registros de prueba para la tabla "asesor"
INSERT INTO asesor (id_asesor, pass, nombre, correo, area, oficina)
VALUES
    (1, '123', 'Juan Perez Lopez Neira', 'Juan.perez@example.com', 'Virtualización', 'Oficina A'),
    (2, '123', 'Rodrigo Moya Sobarzo', 'jmoya@uct.cl ', 'Seguimiento y estudio  y PID', 'CJP11-325'),
    (3, '123', 'Mariel Soto Riveros', 'msoto@uct.cl', 'Virtualización, asesoria docente  y Impulsa tu RED', 'CJP11-250'),
    (4, '123', 'Georgina Durán Jiménez', 'gduran@uct.cl ', 'Virtualización, comunidad de aprendizaje , asesoria docente, Formación docente', 'CJP11-250'),
    (5, '123', 'Jaime Orellana García', 'jorellana@uct.cl', 'Laboratorio Experimental - Realidades Extendidas ', 'CJP11-250'),
    (6, '123', 'Sergio Sanhueza Jara', 'ssanhueza@uct.cl', 'Bienestar Docente, asesoria docente, comunidades de aprendizaje, Formación docente', 'CJP11-335'),
    (7, '123', 'Fabiola Castro Sepulveda ', 'fcastro@uct.cl', 'Gestión agenda Dirección , espacios y procesos CINAP', 'CJP11-250'),
    (8, '123', 'Felipe Bello Poblete', 'fbello@uct.cl', 'Diseño de recursos multimedia', 'CJP10-220'),
    (9, '123', 'Sebastián Garrido Reyes', 'sebastian.garrido@uct.cl', 'Seguimiento y estudio , Datos', 'CJP11-325'),
    (10, '123', 'Juan Maripillan Muñoz', 'jmaripillan@uct.cl', 'EDUCA Blackboard,moodle,  zoom , nearpod', 'CJP11-335'),
    (11, '123', 'Wilma Vidal Hernandez', 'wvidal@uct.cl', 'Comunidades de aprendizaje, asesoria docente , guias de aprendizaje, Formación docente', 'CJP11-250'),
    (12, '123', 'Eileen Makarena Pardo Alvarado', 'epardo@uct.cl', 'Asesoria docente, innovación , realidades extendidas  , Formación docente', 'CJP11-250'),
    (13, '123', 'Teresa Castro  Arellano', 'tcastro@uct.cl', 'Asesoria docente, Virtualización y  guias de aprendizaje', 'CJP11-250'),
    (14, '123', 'Ricardo Garcia Hormazabal', 'rgarcia@uct.cl', 'Investigación, comunidades de aprendizaje y asesoria Docente', 'CJP11-250'),
    (15, '123', 'Gema Pascual Hoyuelos', 'gpascual@uct.cl', 'Formación docente, comunidades de aprendizaje, circulos docentes  y asesoria Docente', 'CSF05-302'),
    (16, '123', 'Monica Kaechele Obreque', 'cinap@uct.cl', 'Directora CINAP', 'CJP11-320'),
    (17, '123', 'Claudio Palma Ávila', 'cpalma@uct.cl', 'Educación Digital, asesoria docente, virtualización, Tutores Elearning, Formación docente', 'CJP10-220'),
    (18, '123', 'Maria Constanza Uribe Sandoval', 'muribe@uct.cl', 'Diseño de recursos multimedia', 'CJP11-330'),
    (19, '123', 'Christian Bajas Torres', 'cbajas@uct.cl', 'Diseño de recursos multimedia', 'CJP11-330'),
    (20, '123', 'Jorge Yañez Sepulveda', 'jyanez@uct.cl', 'Virtualización, asesoria docente, seguimiento y estudio', 'CJP11-325'),
    (21, '123', 'Rocio Cristi Gomzalez ', 'rcristi@uct.cl', 'Colegio de ayudantes, tutores y tutoras , comunidades de aprendizaje y asesoria docente', 'CJP04-107');
    
-- Registros de prueba para la tabla "usuario"
INSERT INTO usuario (id_usuario, pass, nombre, correo, asesor)
VALUES
    (1, '123', 'Juan Perez', 'Juan.perez@example.com', 1),
    (2, '123', 'Martin Lutero', 'mlutero@example.com', 0),
    (3, '123', 'Rodrigo Moya Sobarzo', 'jmoya@uct.cl ', 1),
    (4, '123', 'Mariel Soto Riveros', 'msoto@uct.cl', 1),
    (5, '123', 'Georgina Durán Jiménez', 'gduran@uct.cl ', 1),
    (6, '123', 'Jaime Orellana García', 'jorellana@uct.cl', 1),
    (7, '123', 'Sergio Sanhueza Jara', 'ssanhueza@uct.cl', 1),
    (8, '123', 'Fabiola Castro Sepulveda ', 'fcastro@uct.cl', 1),
    (9, '123', 'Felipe Bello Poblete', 'fbello@uct.cl', 1),
    (10, '123', 'Sebastián Garrido Reyes', 'sebastian.garrido@uct.cl', 1),
    (11, '123', 'Juan Maripillan Muñoz', 'jmaripillan@uct.cl', 1),
    (12, '123', 'Wilma Vidal Hernandez', 'wvidal@uct.cl', 1),
    (13, '123', 'Eileen Makarena Pardo Alvarado', 'epardo@uct.cl', 1),
    (14, '123', 'Teresa Castro  Arellano', 'tcastro@uct.cl', 1),
    (15, '123', 'Ricardo Garcia Hormazabal', 'rgarcia@uct.cl', 1),
    (16, '123', 'Gema Pascual Hoyuelos', 'gpascual@uct.cl', 1),
    (17, '123', 'Monica Kaechele Obreque', 'cinap@uct.cl', 1),
    (18, '123', 'Claudio Palma Ávila', 'cpalma@uct.cl', 1),
    (19, '123', 'Maria Constanza Uribe Sandoval', 'muribe@uct.cl', 1),
    (20, '123', 'Christian Bajas Torres', 'cbajas@uct.cl', 1),
    (21, '123', 'Jorge Yañez Sepulveda', 'jyanez@uct.cl', 1),
    (22, '123', 'Rocio Cristi Gomzalez ', 'rcristi@uct.cl', 1);


--CREATE DATABASE zafiro;

--USE zafiro;

-- Crear la tabla "usuario"
--CREATE TABLE usuario (
--    id INT PRIMARY KEY,
--    pass VARCHAR(50) NOT NULL,
--    nombre VARCHAR(50) NOT NULL,
--    apellido VARCHAR(50) NOT NULL,
--    rut VARCHAR(12) NOT NULL,
--    correo VARCHAR(100) NOT NULL,
--    facultad VARCHAR(100) NOT NULL,
--    t_planta BOOLEAN NOT NULL
--);

-- Crear la tabla "asesor"
--CREATE TABLE asesor (
--    id INT PRIMARY KEY,
--    pass VARCHAR(50) NOT NULL,
--    nombre VARCHAR(50) NOT NULL,
--    apellido VARCHAR(50) NOT NULL,
--    rut VARCHAR(12) NOT NULL,
--    correo VARCHAR(100) NOT NULL,
--    area VARCHAR(100) NOT NULL
--);


-- Crear la tabla "horas"
--CREATE TABLE horas (
--    id INT PRIMARY KEY,
--    descripcion VARCHAR(100) NOT NULL,
--    hora TIME NOT NULL,
--    fecha DATE NOT NULL,
--    id_usuario INT,
--    id_asesor INT,
--    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
--    FOREIGN KEY (id_asesor) REFERENCES asesor(id)
--);
