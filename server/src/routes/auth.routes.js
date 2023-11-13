const express = require('express');

const router = express.Router();

function authentication(pool) {
  // Endpoint for authentication
  router.post('/auth', async (req, res) => {
    const { correo, contraseña } = req.body;

    console.log('Login request received:');
    console.log('Email:', correo);
    console.log('Password:', contraseña);

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

  return router;
}

module.exports = authentication;