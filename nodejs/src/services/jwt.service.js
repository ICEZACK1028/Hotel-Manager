'use strict';

//Importaciones
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'ultrasecreto';

exports.createToken = function (user){
    var payload ={
        sub: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        rol: user.rol,
        address: user.address,
        birthday: user.birthday,
        email: user.email,
        iat: moment().unix(),
        exp: moment().day(20, 'days').unix()
    }

    return jwt.encode(payload, secret);
}