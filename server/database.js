import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getUsuarios() {
  const [rows] = await pool.query("SELECT * FROM usuario");
  return rows;
}

export async function getUsuarioById(id) {
  const [rows] = await pool.query("SELECT * FROM usuario WHERE id = ?", [id]);
  return rows[0];
}

export async function createUsuario(nombre, apellido, rut, correo, facultad, t_planta) {
  const [result] = await pool.query(
    "INSERT INTO usuario (nombre, apellido, rut, correo, facultad, t_planta) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre, apellido, rut, correo, facultad, t_planta]
  );
  const usuarioId = result.insertId;
  return getUsuarioById(usuarioId);
}

export async function getAsesores() {
  const [rows] = await pool.query("SELECT * FROM asesor");
  return rows;
}

export async function getAsesorById(id) {
  const [rows] = await pool.query("SELECT * FROM asesor WHERE id = ?", [id]);
  return rows[0];
}

export async function createAsesor(nombre, apellido, rut, correo, area) {
  const [result] = await pool.query(
    "INSERT INTO asesor (nombre, apellido, rut, correo, area) VALUES (?, ?, ?, ?, ?)",
    [nombre, apellido, rut, correo, area]
  );
  const asesorId = result.insertId;
  return getAsesorById(asesorId);
}

export async function getHoras() {
  const [rows] = await pool.query("SELECT * FROM horas");
  return rows;
}

export async function getHoraById(id) {
  const [rows] = await pool.query("SELECT * FROM horas WHERE id = ?", [id]);
  return rows[0];
}

export async function createHora(descripcion, hora, fecha, id_usuario, id_asesor) {
  const [result] = await pool.query(
    "INSERT INTO horas (descripcion, hora, fecha, id_usuario, id_asesor) VALUES (?, ?, ?, ?, ?)",
    [descripcion, hora, fecha, id_usuario, id_asesor]
  );
  const horaId = result.insertId;
  return getHoraById(horaId);
}

export async function deleteHora(id) {
  const [result] = await pool.query("DELETE FROM horas WHERE id = ?", [id]);
  return result;
}
