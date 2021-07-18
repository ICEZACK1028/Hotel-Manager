'use strict'

//Importaciones
const express = require('express');
const bedroomController = require('../controllers/bedroom.controller');


//Middlewares
const md_authentication = require('../middlewares/authenticated');

//rutas
var api = express.Router();

api.post('/addRoom/:idHotel', bedroomController.addBedroom);
api.get('/getBedroom/:idHotel', bedroomController.getBedrooms);


//Exportación
module.exports = api;