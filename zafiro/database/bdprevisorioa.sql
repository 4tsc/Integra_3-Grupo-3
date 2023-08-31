-- Crear la tabla "usuario"
CREATE TABLE usuario (
    id INT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL,
    nombre VARCHAR(50) NOT NULL
);

-- Crear la tabla "asesor"
CREATE TABLE asesor (
    id INT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL,
    nombre VARCHAR(50) NOT NULL
);

-- Crear la tabla "horas"
CREATE TABLE horas (
    id INT PRIMARY KEY,
    hora TIME NOT NULL,
    fecha DATE NOT NULL,
    id_usuario INT,
    id_asesor INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_asesor) REFERENCES asesor(id)
);
