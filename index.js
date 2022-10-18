require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Create Express server
const app = express();


// Middleware que se va a ejecutar de aquí hasta la última línea de este JS

// CORS config
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// DataBase
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));



app.listen(process.env.PORT, () => {
    console.log('Server running on server: ' + process.env.PORT);
});