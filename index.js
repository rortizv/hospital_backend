require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();


// Middleware que se va a ejecutar de aquí hasta la última línea de este JS
app.use(cors());

dbConnection();

app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'Correct'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Server running on server: ' + process.env.PORT);
});