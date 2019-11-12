var Account = require('../models').account;
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {

  passport.serializeUser(function (user, cb) {
    console.log("SERIALIZANDO ::::::");
    console.log(user);
      cb(null, user);
  });

  passport.deserializeUser(function (user, cb) {
    console.log("DESERIALIZANDO ::::::");
    console.log("USER :::::: " + user);
    Account.findOne({ where: { uuid: user.user_id }, attributes:['uuid', 'account_type'] })
    .then( result => {
      console.log("IN DESERIALIZE")
      data = {
        user_id: result.uuid,
        account_type: result.account_type
      }
      console.log(data)
      cb(null, data);
    })
    .catch( err => {
      console.log(err)
      cb(null, err);
    })
  });

  passport.use('local', new LocalStrategy (
    { usernameField: 'email', passwordField: 'password' },
    function( email, password, done) {
      console.log("IN PASSPORT ::::::"); console.log("CREDENTIALS :::::: " + email);
      Account.findOne({ where: { email: email, status: 'Active' }, attributes: ['uuid','name', 'surname', 'password'] })
        .then(function(user) {
          console.log('IN USER FIND ::::::');
          if(user) {
            var confirm = bcrypt.compareSync(password, user.password);
              console.log('VALIDATE PASSWORD ::::::'); console.log(confirm);
            if(confirm) { console.log(" USER DATA ::::::"); console.log(user);
              //var user = user.dataValues
              var data = {
                user_id: user.uuid,
                name: user.name,
                surname: user.surname
              }
              done(null, data)
            } else { console.log("PASSWORD NO VALID ::::::");
              return done(null, false);
            }
          } else { console.log("NO FIND USER ::::::");
            return done(null, false);
          }
        })
        .catch(error => {
          console.log("IN ERROR")
          console.log(error);
        });
    })
  );
}
