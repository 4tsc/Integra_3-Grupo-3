const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require("cors");

const path = require('path');
const uuid = require('uuid/v4');

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());

// database connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'zafiro',
    password: '12345678',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

// Routes
app.use(require('./routes/image.routes')(pool));
app.use(require('./routes/auth.routes')(pool));
app.use(require('./routes/user.routes')(pool));
app.use(require('./routes/hours.routes')(pool));
app.use(require('./routes/advisor.routes')(pool));
app.use(require('./routes/email.routes')(sgMail));


// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});