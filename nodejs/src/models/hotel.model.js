'use strict';

//Variables
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    name: String, 
    details: String, 
    direction: String,
    rating: String, 
    admin: {type: Schema.Types.ObjectId, ref: 'users' }
})

//Exportamos
module.exports = mongoose.model('hotels', HotelSchema);