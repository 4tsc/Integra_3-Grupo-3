const express = require('express');

const router = express.Router();

function HoursConfig(pool) {
  
  router.delete('/horas/:userId/:horaId', async (req, res) => {
    const userId = req.params.userId;
    const horaId = req.params.horaId;

    try {
      console.log('Eliminar hora usando userId:', userId, 'y horaId:', horaId);
      // Consulta SQL para eliminar la hora específica por su id
      const sql = `
      DELETE FROM horas
      WHERE (id_usuario = ? AND id = ?) OR (id_asesor = ? AND id = ?);

      `;

      const [result] = await pool.query(sql, [userId, horaId, userId, horaId]);


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
    WHERE id_usuario = ? OR id_asesor = ?;
    `;
    
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(sql, [userId, userId]);
  
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
  
      console.log('Creando hora con id Usuario:', idUsuario, 'idAsesor:', idAsesor, 'fecha:', fecha, 'hora:', hora, 'descripcion:', descripcion);
  
      // Ensure that all required fields are present
      if (!idUsuario || !idAsesor || !fecha || !hora || !descripcion) {
        console.error('Missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Extract date and time components
      const fechaCortada = fecha.slice(0, 10);
      const horaCortada = hora.slice(0, -7);
  
      try {
        // Primera consulta: Obtener el correo del asesor usando idAsesor
        const correoAsesorQuery = 'SELECT correo FROM asesor WHERE id_asesor = ?';
        const [correoResult] = await pool.query(correoAsesorQuery, [idAsesor]);
        const correoAsesor = correoResult[0].correo;
  
        // Segunda consulta: Obtener id_usuario del asesor usando el correo
        const idUsuarioAsesorQuery = 'SELECT id_usuario FROM usuario WHERE correo = ? AND asesor = 1';
        const [idUsuarioAsesorResult] = await pool.query(idUsuarioAsesorQuery, [correoAsesor]);
        const idUsuarioAsesor = idUsuarioAsesorResult[0].id_usuario;
  
        // Insertar en la tabla de horas
        const insertHourQuery = `
          INSERT INTO horas (id_usuario, id_asesor, fecha, hora, descripcion)
          VALUES (?, ?, ?, ?, ?);
        `;
  
        await pool.query(insertHourQuery, [idUsuario, idUsuarioAsesor, fechaCortada, horaCortada, descripcion]);
  
        console.log('Hour created successfully');
  
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
