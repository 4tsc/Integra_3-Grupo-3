// Importa las dependencias
const express = require('express');
const sgMail = require('@sendgrid/mail');
const app = express();
const port = process.env.PORT || 3000;

// Utiliza la clave de API de SendGrid desde las variables de entorno
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Define los valores específicos
const nombreAsesor = 'Juanin Juan Jarris';
const nombreDocente = 'john jonah jameson';
const fecha = '30/02/21';
const hora = '14:00';
const Asunto = 'Insertar Asunto';
const CorreoAsesor = 'c.a.ulloa.vera@gmail.com';
const CorreoDocente = 'carlos.ulloa2020@alu.uct.cl';

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

// Ruta para enviar dos correos electrónicos
app.post('/enviar-correo', (req, res) => {
  // Define los mensajes con HTML actualizado
  const msg1 = {
    // Correo al Asesor
    to: CorreoAsesor,//Correo para
    from: 'carlos.ulloa2020@alu.uct.cl',
    subject: 'Se ha reservado una Consulta de Asesoría',
    html: HTMLAsesor,
  };

  const msg2 = {
    // Correo al Docente
    to: CorreoDocente,//Correo para
    from: 'carlos.ulloa2020@alu.uct.cl',
    subject: `Se reservó una Consulta con ${nombreAsesor} para el ${fecha} a las ${hora}`,
    html: HTMLDocente,
  };

  // Envía ambos correos electrónicos
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

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
