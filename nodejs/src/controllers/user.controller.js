'use strict'

//Importaciones
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt.service');

module.exports={


  //------------------------FUNCIONES DEL USUARIO------------------------
    //Función para registrar: 
    registerUser: function(req, res){
        var userBuilder = new userModel();
        var params = req.body;
        userBuilder.username = params.username;
        userBuilder.firstname = params.firstname;
        userBuilder.lastname = params.lastname;
        userBuilder.address = params.address;
        userBuilder.birthday = params.birthday;
        userBuilder.email = params.email;
        userBuilder.image = null;
        userBuilder.rol = 'Usuario';

        userModel.find({ username: userBuilder.username}).exec((err, userFound)=>{
            if(err) res.status(500).send({ message: 'Ha ocurrido un error'});

            if(userFound && userFound.length >=1 ){
                return res.status(500).send({ message: `El usuario '${params.username}' ya está en uso. Prueba con otro` });
            }else{
                bcrypt.hash(params.password, null, null, (err, PassCrypt)=>{
                    userBuilder.password= PassCrypt;

                    userBuilder.save((err, userSaved)=>{
                        if(userSaved){
                            res.status(200).send({ userSaved });
                        }else{
                            res.status(500).send({ message: 'No se ha podido registrar el usuario'});
                        }
                    });
                });
            }
        });
    },

    //Función para loguearse
    login: function(req, res){
        var params = req.body;

        userModel.findOne({ username: params.username }, (err, userFound)=>{
            if(err) return  res.status(500).send({message: 'Upsss ha surgido un error'});

            if(userFound){
                bcrypt.compare(params.password, userFound.password, (err, PassCrypt)=>{
                    if(PassCrypt){
                        if(params.getToken === 'true'){
                            return res.status(200).send({Token: jwt.createToken(userFound)});
                        }else{
                            userFound.password = undefined;
                            return res.status(200).send({ userFound });
                        }
                    }else{
                        return res.status(500).send({message: 'El usuario no se ha podido identificar'});
                    }
                });
            }else{
                return res.status(500).send({message: 'Usuario o contraseña incorrectos, vuelva a intentarlo'});
            }
        });
    },

    //Función para editar su cuenta:
    editUser: function(req,res){
        var params = req.body;
        var idUser = req.user.sub;

        delete params.password;
        delete params.rol;

      // if(idUser != req.user.sub) return res.status(500).send({ message: 'No te has logueado' });

        // userModel.find({ user: params.user}).exec((err, userFound)=>{
        //     if(userFound && userFound.length >= 1){
        //         return res.status(500).send({message: 'El usuario ya está en uso, prueba con otro'});
        //     }else{
                //Se busca el usuario logueado para editar su cuenta
                userModel.findByIdAndUpdate(idUser, params, {new: true, useFindAndModify: false}, (err, userUpdated)=>{
        
                    if(err) return res.status(500).send({ message: 'No pudimos hacer nada, ha emergido un error'});
                    if(!userUpdated) return res.status(500).send({ message: 'Vuelve a iniciar sesión' });
        
                    return res.status(200).send({  userUpdated });
                });
        //     }
        // })
    }, 

    editUser2: function(req,res){
        var params = req.body;
        var idUser = req.params.idUser;

        delete params.password;
        delete params.rol;

        if(req.user.rol != 'ADMIN') return res.status(500).send({ message: 'NO sos el mero mero' });

        // userModel.find({ user: params.user}).exec((err, userFound)=>{
        //     if(userFound && userFound.length >= 1){
        //         return res.status(500).send({message: 'El usuario ya está en uso, prueba con otro'});
        //     }else{
                //Se busca el usuario logueado para editar su cuenta
                userModel.findByIdAndUpdate(idUser, params, {new: true, useFindAndModify: false}, (err, userUpdated)=>{
        
                    if(err) return res.status(500).send({ message: 'No pudimos hacer nada, ha emergido un error'});
                    if(!userUpdated) return res.status(500).send({ message: 'Vuelve a iniciar sesión' });
        
                    return res.status(200).send({  userUpdated });
                });
            // }
        // })
    }, 

    //Función para eliminar el usuario logueado:
    deleteUser: function(req, res){
        var idUser = req.user.sub;

        userModel.findByIdAndDelete(idUser, (err, userDeleted)=>{
            if(err) res.status(500).send({ menssage: 'Ha saltado un error de los matorrales' });
            if(!userDeleted) res.status(500).send({ menssage: 'No se ha podido eliminar su usuario'});

            return res.status(200).send({ userDeleted });
        })
    },

    //Función para eliminar el usuario logueado:
    deleteUser2: function(req, res){
        var idUser = req.params.idUser;

        if(req.user.rol != 'ADMIN') return res.status(500).send({ message: 'NO sos el mero mero' });

        userModel.findByIdAndDelete(idUser, (err, userDeleted)=>{
            if(err) res.status(500).send({ menssage: 'Ha saltado un error de los matorrales' });
            if(!userDeleted) res.status(500).send({ menssage: 'No se ha podido eliminar su usuario'});

            return res.status(200).send({ userDeleted });
        })
    },

    //Función para ver su cuenta:
    profile: function(req,res){
        var idUser = req.user.sub;
        
        userModel.findById(idUser, (err, Count)=>{
            if(err) res.status(500).send({ menssage: 'Se ha levantado un error' });
            if(!Count) res.status(500).send({ message: 'Vuelve a loguearte para ver tu cuenta' });

            return res.status(200).send({ Count});
        })
    },

    //Función para ver todos los usuarios:
    getUsers: function(req,res){
    
        userModel.find((err, usersFound)=>{
            if(err) res.status(500).send({ message: 'Ha surgido un error' });
            if(!usersFound) res.status(500).send({ message: 'No se ha encontrado ningún usuario' });

            return res.status(200).send({ usersFound });
        })
    },

    //Función para ver un usuario:
    getUserID: function(req,res){  
      var idUser = req.params.idUser

      userModel.findById(idUser,(err, userFound)=>{
        if(err) return res.status(500).send({ message: 'Ha ocurrido un error' });
        if(!userFound) return res.status(500).send({ message: 'No se ha podido encontrar al usuario'});

        return res.status(200).send({ userFound });
      });
    },

    //Cambiar a manager:
    updateRol: function(req, res){
      var idUser = req.params.idUser;

      userModel.findOneAndUpdate({_id: idUser, rol: 'Usuario'},{rol: 'Manager'}, {new:true, useFindAndModify: false},(err, userFoundRol)=>{
        if(err) return res.status(500).send({ message: 'Error compadre'});
        if(!userFoundRol) return res.status(500).send({ message: 'No se ha encontrado el usuario  / o este usuario ya es manager'});

        return res.status(200).send({ userFoundRol });
      })
    },
}