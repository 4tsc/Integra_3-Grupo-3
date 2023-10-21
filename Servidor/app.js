// Importa las dependencias
const express = require('express');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

// Carga las variables de entorno desde sendgrid.env
dotenv.config({ path: 'sendgrid.env' });

// Utiliza la clave de API de SendGrid desde las variables de entorno
sgMail.setApiKey('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');


// Configura la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Ruta para enviar un correo electrónico
app.post('/enviar-correo', (req, res) => {
  const msg = {
    to: 'carlos.ulloa2020@alu.uct.cl', // Reemplaza con la dirección de correo del destinatario
    from: 'carlos.ulloa2020@alu.uct.cl', // Reemplaza con la dirección de correo del remitente
    subject: 'Tienes un proximo evento ',
    text: 'Soy un correo de prueba',
    html: '<strong>Esto no es importante</strong>',
  };
  const msg2 = {
    to: 'c.a.ulloa.vera@gmail.com', // Reemplaza con la dirección de correo del destinatario
    from: 'carlos.ulloa2020@alu.uct.cl', // Reemplaza con la dirección de correo del remitente
    subject: 'Tienes un proximo evento2 ',
    text: 'Soy un correo de prueba',
    html: '<strong>Esto no es importante</strong>',
  };

  sgMail
    .send(msg, msg2)
    .then(() => {
      res.send('Correo enviado con éxito');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error al enviar el correo');
    });
});

// Inicia el servidor
app.listen(port, '192.168.0.2', () => {
  console.log(`Servidor escuchando en http://192.168.0.2:${port}`);
});
