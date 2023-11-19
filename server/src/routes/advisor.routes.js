const express = require('express');
const router = express.Router();

function AdvisorConfig(pool) {
  router.post('/obtener-asesores', async (req, res) => {
    try {
      const motivoConsulta = req.body.motivoConsulta;
      console.log('Motivo de consulta recibido:', motivoConsulta);

      const sql = `SELECT id_asesor, nombre, correo FROM asesor WHERE area LIKE ?`;
      const [rows] = await pool.query(sql, [`%${motivoConsulta}%`]);

      res.json(rows);
    } catch (error) {
      console.error('Error al obtener asesores:', error);
      res.status(500).json({ error: 'Error en la base de datos' });
    }
  });

router.get('/asesores/:id', async (req, res) => {
  const advisorId = req.params.id;
  console.log('ID del asesor recibido:', advisorId);

  let connection;

  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM asesor WHERE id_asesor = ?', [advisorId]);

    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ mensaje: `No se encontró el asesor con ID ${advisorId}` });
    }
  } catch (error) {
    console.error('Error al obtener el Asesor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});
return router;

}

module.exports = AdvisorConfig;
