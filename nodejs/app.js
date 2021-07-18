'use strict';

//Variables globales
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//Variables de rutas
const _userRoutes = require('./src/routes/user.routes');
const _kindRoutes = require('./src/routes/kind.routes');
const _hotelRoutes = require('./src/routes/hotel.routes');
const _bedroomRoutes = require('./src/routes/bedroom.routes');
const _eventRoutes = require('./src/routes/event.routes');
const _serviceRoutes = require('./src/routes/service.routes');

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Cabecera
app.use(cors());

//Carga de rutas
app.use('/api', _userRoutes, _kindRoutes, _hotelRoutes, _bedroomRoutes, _eventRoutes, _serviceRoutes);

//Exportación
module.exports = app;