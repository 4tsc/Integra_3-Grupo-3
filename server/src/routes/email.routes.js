const express = require('express');

const router = express.Router();

function EmailConfig(sgMail) {
    router.post('/enviar-correo', (req, res) => {
      // Extrae los datos necesarios del cuerpo de la solicitud 
      const { especialidad, nombreAsesor,nombreDocente,fecha,hora,correoDocente,correoAsesor, enlace, oficina, modoreunion } = req.body;
      console.log('Especialidad recibida en el servidor:', especialidad);
      const HTMLAsesor = `
        <html>
        <body>
            <p>Estimado ${nombreAsesor},</p>
            <p>Le informamos que el Docente <b>${nombreDocente}</b> agendó una reunión <b>${modoreunion}</b> de consulta para el día ${fecha} 
            a las ${hora} hrs buscando ayuda en la especialidad: ${especialidad}.
            </p>
            <p>Si su asesoria es online ingrese al siguiente link ${enlace}.</p>
            <p>Si su asesoria es presencial debe ir a la oficina: <b>${oficina}</b></p>
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
        <p>Le informamos que su reunión <b>${modoreunion}</b> con <b>${nombreAsesor}</b> para la consulta sobre: 
        <b>${especialidad}</b> se agendó correctamente para el día <b>${fecha}</b> a las ${hora} hrs.

        <p>Si la asesoria es online ingrese al siguiente link ${enlace}.</p>
        <p>Si la asesoria es presencial debe ir a la oficina: <b>${oficina}</b></p>
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
          console.log('Correo Asesor:',correoAsesor,'Nombre Asesor:', nombreAsesor, 'nombre Docente:', nombreDocente)
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
