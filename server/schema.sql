CREATE DATABASE zafiro;

USE zafiro;

-- Crear la tabla "usuario"
CREATE TABLE usuario (
    id INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    rut VARCHAR(12) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    facultad VARCHAR(100) NOT NULL,
    t_planta BOOLEAN NOT NULL
);

-- Crear la tabla "asesor"
CREATE TABLE asesor (
    id INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    rut VARCHAR(12) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL
);


-- Crear la tabla "horas"
CREATE TABLE horas (
    id INT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    hora TIME NOT NULL,
    fecha DATE NOT NULL,
    id_usuario INT,
    id_asesor INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_asesor) REFERENCES asesor(id)
);
