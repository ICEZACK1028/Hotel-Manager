'use strict';

//Variables 
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BedroomSchema = Schema({
    name: String, 
    capacity: Number,
    description: String,
    price: Number,
    Check: [{checkIn: Date,
        checkOut: Date}],
    hotel: {type: Schema.Types.ObjectId, ref: 'hotels'},
})

//Exportamos el modelo 
module.exports = mongoose.model('bedrooms', BedroomSchema);