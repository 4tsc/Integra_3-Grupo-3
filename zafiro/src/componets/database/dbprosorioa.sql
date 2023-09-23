-- prueba
CREATE TABLE usuario (
    id INT PRIMARY KEY,
    pass VARCHAR(500) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    rut VARCHAR(12) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    facultad VARCHAR(100) NOT NULL,
    t_planta VARCHAR(100) NOT NULL
);

CREATE TABLE asesor (
    id INT PRIMARY KEY,
    pass VARCHAR(500) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    rut VARCHAR(12) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL
);

CREATE TABLE horas (
    id INT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    hora TIME NOT NULL,
    disponibilidad BOOLEAN NOT NULL,
    fecha DATE NOT NULL,
    id_usuario INT,
    id_asesor INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_asesor) REFERENCES asesor(id)
);

INSERT INTO usuario (id, nombre, apellido, rut, correo, facultad, t_planta, pass)
VALUES
    (1, 'Juan', 'Pérez', '12345678-9', 'juan.perez@example.com', 'Facultad de Ciencias', 'partime', '123'),
    (2, 'María', 'Gómez', '98765432-1', 'maria.gomez@example.com', 'Facultad de Letras', 'permanente', '123'),
    (3, 'Pedro', 'Sánchez', '34567890-1', 'pedro.sanchez@example.com', 'Facultad de Artes', 'adjunta', '123');

INSERT INTO asesor (id, nombre, apellido, rut, correo, area, pass)
VALUES
    (1, 'Carlos', 'López', '45678912-3', 'carlos.lopez@example.com', 'virtualización', '123'),
    (2, 'Ana', 'Martínez', '78912345-6', 'ana.martinez@example.com', 'comunidades', '123'),
    (3, 'Laura', 'García', '23456789-0', 'laura.garcia@example.com', 'virtualización', '123');