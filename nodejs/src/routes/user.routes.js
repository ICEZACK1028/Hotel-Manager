'use strict';

//Importaciones
const express = require('express');
const userController = require('../controllers/user.controller');

//Middlewares
const md_authentication = require('../middlewares/authenticated');

//Rutas 
var api = express.Router();

api.post('/registerUser', userController.registerUser);
api.post('/login', userController.login);
api.get('/getUsers', userController.getUsers);
api.get('/getUserID/:idUser', userController.getUserID);
api.put('/editUser', md_authentication.ensureAuth, userController.editUser);
api.put('/editUser2/:idUser', md_authentication.ensureAuth, userController.editUser2);
api.delete('/deleteUserLog/:idUser', md_authentication.ensureAuth, userController.deleteUser);
api.delete('/deleteUser/:idUser', md_authentication.ensureAuth, userController.deleteUser2);
api.get('/profile', md_authentication.ensureAuth, userController.profile);
api.put('/updateRol/:idUser', md_authentication.ensureAuth, userController.updateRol);

//Exportación de la ruta
module.exports = api;