'use strict';

//Importaciones

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const app = require('./app');
const Users = require('./src/models/user.model');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/HotelManager', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

    var User = new Users();
    User.firstname = 'Oscar';
    User.lastname = 'De la Olla';
    User.username = 'Administrador';
    User.password = '12345';
    User.rol = 'ADMIN';
    User.address = 'Ciudad Cayalá';
    User.birthday = '1980/10/10';
    User.email = 'admin@tr.com';
    User.image = null; 


    Users.find({ username: User.username }).exec((err, userFound)=>{

        if(userFound && userFound.length >=1){
            return console.log('The admin has already been created');
        }else{
            bcrypt.hash(User.password, null, null, (err, passCrypt)=>{
                User.password = passCrypt;

                User.save((err, userSaved)=>{
                    if(err) res.status(500).send({message: 'Ha ocurrido un error'});
                    if(userSaved){
                        return console.log(userSaved);
                    }else{
                        return console.log('No se ha podido registrar el ADMIN');
                    }
                });
            });
        }
    });

    app.listen(3000, () => console.log('Server ready port: 3000'));

}).catch(err => console.log(err));

