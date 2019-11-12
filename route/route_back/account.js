var Account = require('../../models').account;
var cerrors = require('../../helpers/custom-errors');
var vaccount = require('../../validations/validations_back/account');

module.exports = function(app) {
 var account_id = "ccfc63bb-036b-4187-8abd-5db548b04e8c";
// CREATE
  app.post('/account', (req, res) => { console.log(" POST ACCOUNT ::::::");
    let errors = vaccount.validateAccountCreation(req);
    if( errors ) {
      res.status(400).json( errors );
    } else {
      let data = { email, password, terms } = req.body;
      Account.create( data )
      .then ( result => { console.log(result)
        let messages = [{ message:  "Se ha enviado un correo electrónico para activar su cuenta." }]
        res.status(200).json( messages );
      })
      .catch( err =>{ console.log( err )
        let e = cerrors.getErrors(err);
        res.status(400).json( e );
      })
    }
  })
//READ ONE by id, you can change the filter.
  app.get('/account', (req, res) => { console.log(" GET ACCOUNT ::::::");
    Account.findByPk( account_id , { attributes: { exclude: ['password'] } })
    .then( result => { console.log(result)
       res.status(200).json(result) 
    })
    .catch( err => { console.log( err )
      let e = cerrors.getErrors(err);
      res.status(400).json( e );
    })
  })
// UPDATE
  app.put('/account', (req, res) => { console.log(" PUT ACCOUNT ::::::");
    let errors = vaccount.validateAccountUpdate(req);
    if( errors ) {
      res.status(400).json( errors );
    } else {
      let data = { name, lastname, mlastname, birthday, cellphone } = req.body;
      Account.update( data , { where: { uuid: account_id } } )
      .then( result => { console.log( result )
        let messages = [{ message:  "Se ha actualizado su registro." }]
        res.status(200).json( messages );
      })
      .catch( err => { console.log( err )
        let e = cerrors.getErrors(err);
        res.status(400).json( e );
      })
    }
  })
//DELETE
  app.delete('/account', (req, res) => { console.log(" DELETE ACCOUNT ::::::");
    Account.destroy({ where: { uuid: req.params.id } })
    .then( result => {
      res.json( result );
    })
    .catch( err => {
      let e = cerrors.err();
      res.json({ errors: e })
    })
  })

  // app.put('/account/password', (req, res) => {

  // })

}
