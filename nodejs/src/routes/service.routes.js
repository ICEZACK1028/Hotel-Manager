'use strict';

//Importaciones
const express = require('express');
const serviceController = require('../controllers/service.controller');

//Middlewares
const md_authentication = require('../middlewares/authenticated');

//Rutas 
var api = express.Router();

api.post('/addService/:idHotel', serviceController.addService);
api.get('/getServices/:idHotel', serviceController.getServices);

//Exportación de la variable para la rutas
module.exports = api;