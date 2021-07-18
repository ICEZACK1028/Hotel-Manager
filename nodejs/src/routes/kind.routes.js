'use strict';

//Importaciones
const express = require('express');
const kindController = require('../controllers/kind_event.controller');

//Middlewares
const md_authentication = require('../middlewares/authenticated');

//Rutas 
var api = express.Router();

api.post('/addKind', kindController.addKind);

//Exportación de la variable para la rutas
module.exports = api;