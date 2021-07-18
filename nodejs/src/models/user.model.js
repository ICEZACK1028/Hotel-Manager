'use strict';

//Declaraciones de variables
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    firstname: String,
    lastname: String, 
    username: String,
    password: String, 
    rol: String,
    address: String,
    birthday: String,
    email: String,
    image: String
});

//Exportamos
module.exports = mongoose.model('users', UserSchema);