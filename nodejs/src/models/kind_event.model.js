'use strict';

//Variables
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KindEventSchema = Schema({
    name: String,
    description: String
})

//Exportamos el modelo

module.exports = mongoose.model('kindEvents', KindEventSchema);