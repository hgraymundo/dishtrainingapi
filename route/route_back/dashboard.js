
module.exports = function(app) {

  app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('./dashboard/dashboard');
  })

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    console.log(req.isAuthenticated())
    res.redirect('/login');
  }

}
