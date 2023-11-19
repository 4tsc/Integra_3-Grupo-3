const express = require('express');

const router = express.Router();

function EmailConfig(sgMail) {
    router.post('/enviar-correo', (req, res) => {

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

  return router;
}

module.exports = EmailConfig;
