'use strict';

//Importaciones
const kindModel = require('../models/kind_event.model');

module.exports = {

    //Función para agregar el tipo:
    addKind: function(req, res){
        var kindBuilder = new kindModel();
        var params = req.body;

        kindBuilder.name = params.name;
        kindBuilder.description = params.description;

        kindModel.find({ name: kindBuilder.name}).exec((err, kindFound)=>{

            if(err) res.status(500).send({ message: 'Ha ocurrido un error' });

            if(kindFound && kindFound.length >=1){
                return res.status(500).send({ message: 'Ya existe un tipo con este nombre, pruebe con otro' });
            }else{

                kindBuilder.save((err, kindSaved)=>{
                    if(kindSaved){
                        res.status(200).send({ kindSaved });
                    }else{
                        res.status(500).send({ message: 'No se ha podido guardar el tipo' });
                    }
                });
            };
        });
    },
}