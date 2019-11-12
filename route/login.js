var cerrors = require('../helpers/custom-errors');
var passport = require('passport');


module.exports = function(app) {

  app.post('/student-login', (req, res, next) => { console.log(" IN LOGIN ROUTE ::::::::")
    
  passport.authenticate("local", (err, user) =>{
      console.log("STUDENT LOGIN :::::::: " + user);
      console.log(user);
      if(err) { 
        console.log(err);
      } else {
        if(!user) {
          let e = { message: 'Usuario o contraseña no validos.'}
          res.status(400).json(e)
        } else {
          console.log("SI EXISTE EL USUARIO ::::::");
          console.log(user);
          res.status(200).json(user)
          // req.student-login(user, function(err) {
          //   if (err) { return res.status(400).json(err)}
          //   return res.status(200).json(user)
          // });
        }
      }
    })(req, res, next);
  })


  app.get('/logout', (req, res) => {
    console.log("IN LOGOUT")
    // req.logout();
    req.session.destroy()
    res.send({ "status" : "true"})
  })
}
