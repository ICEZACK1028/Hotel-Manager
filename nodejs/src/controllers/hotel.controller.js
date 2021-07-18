'use strict';

const hotelModel = require('../models/hotel.model');
const userModel = require('../models/user.model');

module.exports = {

    addHotel: function (req, res){
        var hotelBuilder = new hotelModel();
        var userBuilder = new userModel();
        var idAdmin = req.params.idAdmin;
        var params = req.body;

        hotelBuilder.name = params.name; 
        hotelBuilder.details = params.details;
        hotelBuilder.direction = params.direction;
        hotelBuilder.rating = params.rating;
        hotelBuilder.admin = idAdmin;

        usuarioModel.usuario = params.username;
        usuarioModel.firstname = params.firstname;
        usuarioModel.rol = 'Manager'

        // userModel.findOne({_id: idAdmin, rol: 'Manager'}, (err, userFound) =>{
        //     if(err) return res.status(500).send({ message: 'Ha surgido un error' });
        //     if(!userFound) return res.status(500).send( {message: `El administrador ingresado no es 'Manager' o no existe, intente de nuevo` })

            hotelBuilder.save((err, hotelSaved)=>{
                if(err) return res.status(500).send({ message: 'Ha ocurrido un error' });
                if(!hotelSaved) return res.status(500).send({ message: 'No se ha podido guardar el hotel' });

                userModel.findOne({ username: userBuilder.username }, (err, userFound) => {
                  if (err) return res.status(500).send({ message: 'Ha ocurrido un error' });
                  if(!userFound) return res.status(500).send({ message: 'No se ha podido guardar'});
                      hotelSaved.admin = userFound._id;
                      bcrypt.hash(params.password, null, null, (err, passCrypt) => {
                          userBuilder.password = passCrypt;
          
                          userBuilder.save((err, usuarioGuardado) => {
                              if (err) return res.status(500).send({ mensaje: 'Error al guardar Usuario' })
                              if (!usuarioGuardado) return res.status(500).send({ mensaje: 'No se ha podido registrar el usuario' })
          
                              return res.status(200).send({hotelGuardado,usuarioGuardado});
                          })
                      })
              })
                if(hotelSaved){
                    return res.status(200).send({ hotelSaved });
                }else{
                    return res.status(500).send({ message: 'No se ha podido agregar el hotel'});
                }
            });
        // })
    },

    getHotels: function(req,res){

        hotelModel.find((err, hotelsFound)=>{
            if(err) return res.status(500).send({ message: 'Ha ocurrido un error'});
            if(!hotelsFound) return res.status(500).send({ message: 'No se han encontrado los hoteles' });

            return res.status(200).send({hotelsFound});
        });
    },

    getHotelID: function(req,res){
        var idHotel = req.params.idHotel;

        hotelModel.findById(idHotel, (err, hotelFound)=>{
            if(err) return res.status(500).send({ message: 'Ha ocurrido un error'});
            if(!hotelFound) return res.status(500).send({ message: 'No se ha encontrado el hotel'});

            return  res.status(200).send({ hotelFound });
        });
    },

    editHotel: function(req,res){
        var idHotel = req.params.idHotel;
        var params = req.body;

        hotelModel.findByIdAndUpdate(idHotel, params, {new: true, useFindAndModify:false}, (err, hotelFound)=>{
            if(err) return res.status(500).send({ message: 'Ha surgido un error' });
            if(!hotelFound) return res.status(500).send({ message: 'No se ha encontrado el hotel'});
            
            return res.status(200).send({ hotelFound });

        });
    },

    deleteHotel: function(req, res){
        var idHotel = req.params.idHotel;

        hotelModel.findByIdAndDelete(idHotel, (err, hotelDeleted)=>{
            if(err) res.status(500).send({ message:'Ha surgido un error' });
            if(!hotelDeleted) return res.status(500).send({ message: 'No se ha encontrado el hotel'});

            return res.status(200).send({ hotelDeleted });
        });
    }
}