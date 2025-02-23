const express = require('express');
const morgan = require('morgan');
const config = require('./config/config');

const usuarios = require('./routes/rutas_usu');
const tareas = require('./routes/rutas_tar');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Configuración 
app.set('port', config.app.port);

// Rutas
app.use('/usuarios', usuarios);
app.use('/tareas', tareas);

module.exports = app;
