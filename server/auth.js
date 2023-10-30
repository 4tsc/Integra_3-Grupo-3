import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import cors from "cors";

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

// Configura el pool de conexiones MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'zafiro',
  password: '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Endpoint para autenticación
app.post('/auth', async (req, res) => {
  const { correo, contraseña } = req.body;

  console.log('Solicitud de inicio de sesión recibida:');
  console.log('Correo:', correo);
  console.log('Contraseña:', contraseña);

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM usuario WHERE correo = ? AND pass = ?', [correo, contraseña]);

    if (rows.length === 1) {
      // Autenticación exitosa
      res.status(200).json({ mensaje: 'Autenticación exitosa' });
    } else {
      // Autenticación fallida
      res.status(401).json({ mensaje: 'Autenticación fallida' });
    }
  } catch (error) {
    console.error('Error al autenticar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

app.post('/obtener-asesores', (req, res) => {
  const motivoConsulta = req.body.motivoConsulta; // Obtén el motivo de consulta desde la solicitud

  // Realiza una consulta SQL para obtener los asesores según el motivo de consulta
  const sql = `SELECT id_asesor, nombre FROM asesor WHERE area LIKE '%${motivoConsulta}%';`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener una conexión de la piscina: ' + err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    connection.query(sql, (error, rows) => {
      connection.release(); // Libera la conexión de la piscina

      if (error) {
        console.error('Error al ejecutar la consulta SQL: ' + error.message);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }

      // Devuelve los resultados de la consulta en formato JSON
      res.json(rows);
    });
  });
});