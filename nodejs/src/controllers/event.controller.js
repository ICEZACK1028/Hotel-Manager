'use strict';

const bedroomModel = require('../models/bedroom.model');
const eventModel = require('../models/event.model');
const hotelModel = require('../models/hotel.model');

module.exports = {

    //Creación de un evento.
    addEvent: function(req, res){
        var eventBuilder = new eventModel();
        var idHotel = req.params.idHotel;
        var params = req.body;

        eventBuilder.name = params.name;
        eventBuilder.description = params.description;
        eventBuilder.date = params.date;
        eventBuilder.kind = params.kind;
        eventBuilder.hotel = idHotel;

        // hotelModel.findById(idHotel, (err, hotelFound)=>{
        //     if(err) return res.status(500).send({ message: 'Ha ocurrido un error' });
        //     if(!hotelFound) return res.status(500).send({ message: 'No se ha encontrado el hotel' });

            eventBuilder.save((err, eventSaved)=>{
                if(eventSaved){
                    return res.status(200).send({ eventSaved });
                }else{
                    return res.status(500).send({ message: 'No se ha podido guardar el evento' })
                }
            });
        // });
    },

    //Eventos por hotel 
    getEventsHotel: function(req,res){
        var idHotel = req.params.idHotel;

        eventModel.find({hotel: idHotel}, (err, eventsFound)=>{
            if(err) return res.status(500).send({ message: 'Ha surgido un error'});
            if(!eventsFound) return res.status(200).send({ message: 'No se han encontrado eventos'});

            return res.status(200).send({ eventsFound });
        });
    },

    
}
