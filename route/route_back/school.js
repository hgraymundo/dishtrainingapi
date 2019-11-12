var School = require('../../models').school;
var cerrors = require('../../helpers/custom-errors');
var vschool = require('../../validations/school');

module.exports = function(app) {

// CREATE
  app.post('/school', (req, res) => { console.log(" POST SCHOOL ::::::");
    School.findOne({ where: { account_id: req.body.account_id}})
      .then( result => {
        console.log("FIND SCHOOL");
        console.log(result);
        if(result) {
          let messages = [{ message:  "Ya existe una escuela registrada." }]
          res.status(200).json( messages );
        } else {
          let errors = vschool.validateSchool(req);
          if( errors ) {
            res.status(400).json( errors );
          } else {
            let data = { name, code, director, phone, street, colony, municipal, state, postal_code, account_id } = req.body;
            // School.findOne({ where})
            School.create( data )
            .then ( result => { console.log(result)
              let messages = [{ message:  "Se ha creado su registro exitosamente." }]
              res.status(200).json( messages );
            })
            .catch( err =>{ console.log( err )
              let e = cerrors.getErrors(err);
              res.status(400).json( e );
            })
          }
        }
      })
      .catch( err => {
        let e = cerrors.getErrors(err);
        res.status(400).json( e );
      })

      

  })

  // READ ONE SCHOOL
  app.get('/school', (req, res) => { console.log(" GET SCHOOL ::::::"); 
    School.findAll( { 
        where: { 
            account_id: "3d0b0c30-0e8e-427b-a2a4-1fba0f957914"  // ESTO ES UN MOCK SE CAMBIARA POR LO QUE VIENE EN LA SESSION
        } , attributes: { exclude: ['logo','assistant','phone2','createdAt', 'updatedAt'] } })
    .then( result => { console.log(result)
       res.status(200).json(result) 
    })
    .catch( err => { console.log( err )
      let e = cerrors.getErrors(err);
      res.status(400).json( e );
    })
  })

//READ ONE by id, you can change the filter. // esta funcionalida es deshabilitada por que el sistema solo usa una escuela por cuenta... por el momento
  // app.get('/school/:id', (req, res) => { console.log(" GET SCHOOL ::::::");
  //   School.findOne( { where: { uuid: req.params.id } , attributes: { exclude: ['createdAt', 'updatedAt'] } })
  //   .then( result => { console.log(result)
  //      res.status(200).json(result) 
  //   })
  //   .catch( err => { console.log( err )
  //     let e = cerrors.getErrors(err);
  //     res.status(400).json( e );
  //   })
  // })
// UPDATE
  app.put('/school/:id', (req, res) => { console.log(" PUT SCHOOL ::::::");
    let errors = vschool.validateSchool(req);
    if( errors ) {
      res.status(400).json( errors );
    } else {
      let data = { name, code, director, assistant, phone, phone2, street, colony, municipal, state, postal_code } = req.body;
      School.update( data , { where: { uuid: req.params.id } } )
      .then( result => { console.log( result )
        let messages = [{ message:  "Se ha actualizado su registro exitosamente." }]
        res.status(200).json( messages );
      })
      .catch( err => { console.log( err )
        let e = cerrors.getErrors(err);
        res.status(400).json( e );
      })
    }
  })
//DELETE deshabilitado el sistema solo gestiona una escuela por instancia...
  // app.delete('/school/:id', (req, res) => { console.log(" DELETE SCHOOL ::::::");
  //   School.destroy({ where: { uuid: req.params.id } })
  //   .then( result => {
  //     res.json( result );
  //   })
  //   .catch( err => {
  //     let e = cerrors.err();
  //     res.json({ errors: e })
  //   })
  // })
}
