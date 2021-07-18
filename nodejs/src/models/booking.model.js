'use strict';

//Variables
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = Schema({ 
    userId: {type: Schema.Types.ObjectId, ref: 'users'},
    idBedroom: {type: Schema.Types.ObjectId, ref: 'bedrooms'},
    checkIn: date,
    cheackOut: date,
    services: [{
        idService: {type: Schema.Types.ObjectId, ref: 'services'}
    }],
    total: Number
});

//Exportación
module.exports = mongoose.model('bookings', BookingSchema);