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
  password: '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
//Constantes para Correos
const nombreAsesor = 'Juanin Juan Jarris';
const nombreDocente = 'john jonah jameson';
const fecha = '30/02/21';
const hora = '14:00';
const Asunto = 'Insertar Asunto';
const CorreoAsesor = 'c.a.ulloa.vera@gmail.com';
const CorreoDocente = 'carlos.ulloa2020@alu.uct.cl';

//HTML de correos
const HTMLAsesor = `
    <html>
    <body>
        <p>Estimado ${nombreAsesor},</p>
        <p>Le informamos que el Docente <b>${nombreDocente}</b> agendó una hora de consulta para el día ${fecha} a las ${hora} hrs con asunto: ${Asunto}.
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
        <p>Le informamos que su reserva de hora para la Consulta con el Asesor <b>${nombreAsesor}</b> se agendó correctamente para el día ${fecha} a las ${hora} hrs sobre el asunto: ${Asunto}.
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
app.post('/enviar-correo', (req, res) => {
  const msg1 = {
    to: CorreoAsesor,
    from: 'carlos.ulloa2020@alu.uct.cl',
    subject: 'Se ha reservado una Consulta de Asesoría',
    html: HTMLAsesor,
  };

  const msg2 = {
    to: CorreoDocente,
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