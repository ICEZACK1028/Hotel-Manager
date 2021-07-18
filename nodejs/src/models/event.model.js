'use strict'

//Declaración 
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = Schema({
    name: String, 
    description: String, 
    date: String,
    kind: {type: Schema.Types.ObjectId, ref: 'kindEvents'},
    hotel: {type: Schema.Types.ObjectId, ref: 'hotels'}
})

//Exportación 
module.exports = mongoose.model('events', EventSchema);
