require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const express = require('express');
const morgan = require('morgan');
const config = require('./config/config');
const cors = require('cors');

const usuarios = require('./routes/rutas_usu');
const tareas = require('./routes/rutas_tar');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Configuracion 
app.set('port', config.app.port);

// Rutas
app.use('/api/usuarios', usuarios)
app.use('/api/tareas', tareas)

module.exports = app;