const express = require('express');

const router = express.Router();

function HoursConfig(pool) {
  router.delete('/horas/:userId/:horaId', async (req, res) => {
    const userId = req.params.userId;
    const horaId = req.params.horaId;

    try {
      // Consulta SQL para eliminar la hora específica por su id
      const sql = `
        DELETE FROM horas
        WHERE id_usuario = ? AND id = ?;
      `;

      const [result] = await pool.query(sql, [userId, horaId]);

      if (result.affectedRows === 0) {
        // No se encontró la hora para eliminar
        res.status(404).send('Hora no encontrada para eliminar');
      } else {
        res.status(200).send('Hora eliminada exitosamente');
      }
    } catch (error) {
      console.error('Error al eliminar la hora:', error);
      res.status(500).send('Error en el servidor al eliminar la hora');
    }
  });


  router.get('/horas/:id', async (req, res) => {
    const userId = req.params.id;
    console.log('userId:', userId);
  
    // Consulta SQL para obtener las horas de un usuario específico con el campo 'id'
    const sql = `
      SELECT id, descripcion, hora, fecha, id_asesor
      FROM horas
      WHERE id_usuario = ?
    `;
    
    try {
      const connection = await pool.getConnection();
  
      const [rows] = await connection.query(sql, [userId]);
  
      // Devuelve los resultados de la consulta en formato JSON con la propiedad 'rows'
      res.json({ rows });
    } catch (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).send('Error en el servidor');
    }
  });


  router.post('/crear-hora', async (req, res) => {
    try {
      const { idUsuario, idAsesor, fecha, hora, descripcion } = req.body;

      // Ensure that all required fields are present
      if (!idUsuario || !idAsesor || !fecha || !hora || !descripcion) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Extract date and time components
      const fechaCortada = fecha.slice(0, 10);
      const horaCortada = hora.slice(0, -7);

      try {
        // Use parameterized query to prevent SQL injection
        const sql = `
          INSERT INTO horas (id_usuario, id_asesor, fecha, hora, descripcion)
          VALUES (?, ?, ?, ?, ?);
        `;

        await pool.query(sql, [idUsuario, idAsesor, fechaCortada, horaCortada, descripcion]);

        // Return a success message in JSON format
        res.json({ mensaje: 'Hora creada con éxito' });
      } catch (error) {
        console.error('Error al crear hora:', error);
        res.status(500).json({ error: 'Error en la base de datos' });
      }
    } catch (error) {
      console.error('Error al crear hora:', error);
      res.status(500).json({ error: 'Error en la base de datos' });
    }
  });

  return router;
}

module.exports = HoursConfig;
