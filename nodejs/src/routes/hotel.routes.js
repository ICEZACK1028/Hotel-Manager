'use strict';

//Importaciones 
const express = require('express');
const hotelController = require('../controllers/hotel.controller');

//Middlewares
const md_authentication = require('../middlewares/authenticated');

//Rutas 
var api = express.Router();

api.post('/addHotel/:idAdmin', hotelController.addHotel);
api.get('/getHotels', hotelController.getHotels);
api.get('/getHotelID/:idHotel', hotelController.getHotelID);
api.put('/editHotel/:idHotel', hotelController.editHotel);
api.delete('/deleteHotel/:idHotel', hotelController.deleteHotel);

//Exportación de las rutas
module.exports = api;