'use strict';

const bookingModel = require('../models/booking.model');
const serviceModel = require('../models/service.model');
const bedroomModel = require('../models/bedroom.model');
const userModel = require('../models/user.model');

module.exports = {

    createBooking: function(idUser){
        var bookingBuilder = new bookingModel();
        bookingBuilder.userId = idUser;
        bookingBuilder.idBedroom = 0;
        bookingBuilder.checkIn = new Date();
        bookingBuilder.cheackOut = new Date();
        bookingBuilder.services = [];
        bookingBuilder.total = 0;

        bookingBuilder.save();
    },

    addBooking: function(req,res){
        var bookingBuilder = new serviceModel();
        var idUser = req.params.idUser;
        var params = req.body;
    }

}