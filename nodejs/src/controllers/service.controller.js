'use strict';

const serviceModel = require('../models/service.model');

module.exports = {

    addService: function(req,res){
        var serviceBuilder = new serviceModel();
        var idHotel = req.params.idHotel;
        var params = req.body;

        serviceBuilder.name = params.name;
        serviceBuilder.description = params.description;
        serviceBuilder.price = params.price;
        serviceBuilder.hotel = idHotel;

        serviceBuilder.save((err, serviceSaved)=>{
            if(err) return res.status(500).send({ message: 'ha surgido un error' });
            if(!serviceSaved) return res.status(500).send({ message:'No se ha podido guardar el usuario' });

            return res.status(200).send({ serviceSaved });
        });
    },

    getServices: function(req,res){
        var idHotel = req.params.idHotel;

        serviceModel.find({ hotel: idHotel }, (err, servicesFound)=>{
            if(err) return res.status(500).send({ message:'ha surgido un error' });
            if(!servicesFound) return res.status(500).send({ message: 'No se han encontrado los servicios'})

            return res.status(200).send({ servicesFound });
        })
    },

}