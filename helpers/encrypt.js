'use strict'

var crypto = require('crypto');

exports.encrypt = function (text){
  var cipher = crypto.createCipher('aes-256-ctr', 'password')
  var crypted = cipher.update(text, 'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

exports.decrypt = function (text) {
  var decipher = crypto.createDecipher('aes-256-ctr', 'password')
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

// var bcrypt = require('bcryptjs');

// exports.encrypt = function (text) {
//   const salt = bcrypt.genSaltSync(13);
//   student.password = bcrypt.hashSync(student.password, salt);
// }