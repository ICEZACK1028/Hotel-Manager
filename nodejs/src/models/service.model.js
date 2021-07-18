'use strict';

//Schema
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = Schema({
    name: String, 
    description: String, 
    price: Number,
    hotel: {type: Schema.Types.ObjectId, ref: 'hotels'}
})

//Exportamos el modelo
module.exports = mongoose.model('services', ServiceSchema); 