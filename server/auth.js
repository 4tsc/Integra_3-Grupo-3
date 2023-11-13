import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import cors from "cors";
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

// Configura el pool de conexiones MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'zafiro',
  password: '1234',//eliminar esto si no estas en pc de ulloa xD
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.post('/enviar-correo', (req, res) => {
  // Extrae los datos necesarios del cuerpo de la solicitud
  const { especialidad, nombreAsesor,nombreDocente,fecha,hora,correoDocente,correoAsesor } = req.body;
  console.log('Especialidad recibida en el servidor:', especialidad);
  const HTMLAsesor = `
    <html>
    <body>
        <p>Estimado ${nombreAsesor},</p>
        <p>Le informamos que el Docente <b>${nombreDocente}</b> agendó una hora de consulta para el día ${fecha} 
        a las ${hora} hrs buscando ayuda en la especialidad: ${especialidad}.
        </p>
        <p>Atentamente,<br>
        <b>Una persona Equis</b><br>
        Universidad Católica de Temuco<br>
        Campus San Juan Pablo II<br>
        Rudecindo Ortega 02950<br>
        Temuco - Chile <br>
        Fono: +56 452 205 453<br>
        https://dte.uct.cl/ <br>
        <img src="https://recursos.uct.cl/wp-content/uploads/2016/04/UCT_logo.png" alt="Descripción" width="200" height="100">
        </p>
    </body>
    </html>
`;

const HTMLDocente = `
<html>
<body>
    <p>Estimado <b>${nombreDocente}</b>,</p>
    <p>Le informamos que su reserva de hora para la Consulta con el Asesor <b>${nombreAsesor}</b> con especialidad: 
    <b>${especialidad}</b> se agendó correctamente para el día <b>${fecha}</b> a las ${hora} hrs.
    </p>
    <p>Atentamente,<br>
    <b>Una persona Equis</b><br>
    Universidad Católica de Temuco<br>
    Campus San Juan Pablo II<br>
    Rudecindo Ortega 02950<br>
    Temuco - Chile <br>
    Fono: +56 452 205 453<br>
    https://dte.uct.cl/ <br>
    <img src="https://recursos.uct.cl/wp-content/uploads/2016/04/UCT_logo.png" alt="Descripción" width="200" height="100">
    </p>
</body>
</html>
`;

  const msg1 = {
    to: correoAsesor,
    from: 'carlos.ulloa2020@alu.uct.cl',
    subject: 'Se ha reservado una Consulta de Asesoría',
    html: HTMLAsesor,
  };

  const msg2 = {
    to: correoDocente,
    from: 'carlos.ulloa2020@alu.uct.cl',
    subject: `Se reservó una Consulta con ${nombreAsesor} para el ${fecha} a las ${hora}`,
    html: HTMLDocente,
  };

  sgMail.send([msg1, msg2])
    .then(() => {
      console.log('Correos enviados con éxito');
      res.send('Correos enviados con éxito');
    })
    .catch((error) => {
      console.error('Error al enviar los correos:', error);
      res.status(500).send('Error al enviar los correos');
    });
});


// Endpoint para autenticación
app.post('/auth_asesor', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM asesor WHERE correo = ? AND pass = ?', [correo, contraseña]);

    if (rows.length === 1) {
      const userId = rows[0].id_asesor; // Obtiene el ID del usuario
      console.log('ID de usuario obtenido:', userId); // Agrega esta línea para imprimir el ID
      res.status(200).json({ mensaje: 'Autenticación exitosa', userId: rows[0].id_asesor, tipoUsuario: 'asesor' });
    } else {
      res.status(401).json({ mensaje: 'Autenticación fallida' });
    }
  } catch (error) {
    console.error('Error al autenticar asesor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

app.post('/auth_usuario', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM usuario WHERE correo = ? AND pass = ?', [correo, contraseña]);

    if (rows.length === 1) {
      const userId = rows[0].id_usuario; // Obtiene el ID del usuario
      console.log('ID de usuario obtenido:', userId); // Agrega esta línea para imprimir el ID
      res.status(200).json({ mensaje: 'Autenticación exitosa', userId: rows[0].id_usuario, tipoUsuario: 'usuario' });
    } else {
      res.status(401).json({ mensaje: 'Autenticación fallida' });
    }
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

app.delete('/horas/:userId/:horaId', async (req, res) => {
  const userId = req.params.userId;
  const horaId = req.params.horaId;

  try {
    const connection = await pool.getConnection();

    // Consulta SQL para eliminar la hora específica por su id
    const sql = `
      DELETE FROM horas
      WHERE id_usuario = ? AND id = ?;
    `;

    await connection.query(sql, [userId, horaId]);

    connection.release();

    res.status(200).send('Hora eliminada exitosamente');
  } catch (error) {
    console.error('Error al eliminar la hora:', error);
    res.status(500).send('Error en el servidor al eliminar la hora');
  }
});

app.get('/horas/:id', async (req, res) => {
  const userId = req.params.id;
  console.log('userId:', userId);

  // Consulta SQL para obtener las horas de un usuario específico con el campo 'id'
  const sql = `
    SELECT id, descripcion, hora, fecha
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

app.post('/crear-hora', async (req, res) => {
  const idUsuario = req.body.id; // Ajustar según sea necesario
  const idAsesor = req.body.id_asesor;
  const fecha = req.body.fecha;
  const hora = req.body.hora;
  const descripcion = req.body.descripcion; // Asumiendo que tienes un campo "descripcion" para la asesoría

  try {
    const connection = await pool.getConnection();

    // La conexión a la base de datos se obtuvo correctamente
    console.log('Conexión a la base de datos exitosa');

    const sql = `
      INSERT INTO horas (id_usuario, id_asesor, fecha, hora, descripcion)
      VALUES (?, ?, ?, ?, ?);
    `;

    await connection.query(sql, [idUsuario, idAsesor, fecha, hora, descripcion, disponibilidad]);

    // Devuelve un mensaje de éxito en formato JSON
    res.json({ mensaje: 'Hora creada con éxito' });
  } catch (error) {
    console.error('Error al crear hora:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
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

app.post('/obtener-asesores', async (req, res) => {
  const motivoConsulta = req.body.motivoConsulta; // Obtén el motivo de consulta desde la solicitud
  console.log('Motivo de consulta recibido:', motivoConsulta);

  try {
    const connection = await pool.getConnection();

    // La conexión a la base de datos se obtuvo correctamente
    console.log('Conexión a la base de datos exitosa');

    const sql = `SELECT id_asesor, nombre FROM asesor WHERE area LIKE '%${motivoConsulta}%';`;

    const [rows] = await connection.query(sql);

    // Devuelve los resultados de la consulta en formato JSON
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener asesores:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});