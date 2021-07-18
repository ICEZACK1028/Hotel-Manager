'use strict';

//Importaciones 
const express = require('express');
const eventController = require('../controllers/event.controller');

//Middlewares
const md_authentication = require('../middlewares/authenticated');

//Rutas 
var api = express.Router();

api.post('/addEvent/:idHotel', eventController.addEvent);
api.get('/getEvents/:idHotel', eventController.getEventsHotel);

//Exportación de las rutas
module.exports = api;