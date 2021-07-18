'use strict';

const bedroomModel = require('../models/bedroom.model');
const hotelModel = require('../models/hotel.model');


module.exports = {

    //Agregar habitación
    addBedroom: function (req, res){
        var bedroomBuilder = new bedroomModel();
        var idHotel = req.params.idHotel;
        var params = req.body;        

        hotelModel.findById(idHotel, (err, hotelFound)=>{
            if(err) return res.status(500).send({ message: 'ha surgido un error' });
            if(!hotelFound) return res.status(500).send({ message: 'No se ha encontrado el hotel'});

            bedroomBuilder.name = params.name;
            bedroomBuilder.capacity = params.capacity;
            bedroomBuilder.description = params.description;
            bedroomBuilder.price = params.price;
            bedroomBuilder.hotel = idHotel;

            bedroomBuilder.save((err, roomSaved)=>{
                if(err) return res.status(500).send({ message: 'Ha ocurrido un error'  });
                if(!roomSaved) {
                    return res.status(500).send({ message: 'no se ha podido agregar la habitación'});
                }else{
                    return res.status(200).send({ roomSaved });
                }
            });
        });
    },

    //Ver las habitaciones por hoteles
    getBedrooms: function (req,res){
        var idHotel = req.params.idHotel;

        bedroomModel.find({hotel: idHotel},(err, bedroomsFound)=>{
            if(err) return res.status(500).send({ message: 'Ha ocurrido un error' });
            if(!bedroomsFound) return res.status(500).send({ message: 'No se ha encontrado ninguna habitación del hotel' });

            return res.status(200).send({ bedroomsFound })
        });
    }


}