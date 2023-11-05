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
  password: '12345678',
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
    const [rows] = await connection.execute('SELECT id_usuario FROM usuario WHERE correo = ? AND pass = ?', [correo, contraseña]);
    connection.release();

    if (rows.length === 1) {
      // Autenticación exitosa
      const userId = rows[0].id_usuario; // Obtiene el ID del usuario
      res.status(200).json({ id: userId }); // Incluye el ID en la respuesta
    } else {
      // Autenticación fallida
      res.status(401).json({ mensaje: 'Autenticación fallida' });
    }
  } catch (error) {
    console.error('Error al autenticar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Rutas protegidas que requieren el ID del usuario

// Obtener información de usuario por ID
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  console.log('ID del usuario recibido:', userId); // Agrega este log

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM usuario WHERE id_usuario = ?', [userId]);
    connection.release();

    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});


// Actualizar información de usuario por ID
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { nombre, correo } = req.body;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'UPDATE usuario SET nombre = ?, correo = ? WHERE id_usuario = ?',
      [nombre, correo, userId]
    );
    connection.release();

    if (result.affectedRows > 0) {
      res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
