var School_Shift = require('../../models').school_shift;
var cerrors = require('../../helpers/custom-errors');
var validations = require('../../validations/school_shift');

module.exports = function(app) {

// CREATE
  app.post('/school-shift', (req, res) => { console.log(" POST SCHOOL SHIFT ::::::");
    let errors = validations.validateSchoolShift(req);
    if( errors ) {
      res.status(400).json( errors );
    } else {
      let data = { description } = req.body;
      School_Shift.create( data )
      .then ( result => { console.log(result)
        let messages = [{ message:  "Se ha creado su registro exitosamente." }]
        res.status(200).json( messages );
      })
      .catch( err =>{ console.log( err )
        let e = cerrors.getErrors(err);
        res.status(400).json( e );
      })
    }
  })
// READ BY ID
    app.get('/school-shift/:id', (req, res) => { console.log(" READ BY ID SCHOOL SHIFT::::::");
        School_Shift.findOne({ 
            where: { uuid: req.params.id },
            attributes: {
                exclude: ['status','createdAt','updatedAt']
            }
        })
        .then( result => {
            res.status(200).json(result)
        })
        .catch( err => {
            let e = cerrors.getErrors(err);
            res.status(400).json( e );
        })
    })
// READ ALL
    app.get('/school-shift', (req, res) => { console.log(" READ ALL SCHOOL SHIFT::::::");
        School_Shift.findAll({
            attributes: {
                exclude: ['status','createdAt','updatedAt']
            }
        })
        .then( result => {
            res.status(200).json(result)
        })
        .catch( err => {
            let e = cerrors.getErrors(err);
            res.status(400).json( e );
        })
    })
// UPDATE
    app.put('/school-shift/:id', (req, res) => { console.log(" UPDATE SCHOOL SHIFT::::::");
        let errors = validations.validateSchoolShift(req);
        if(errors) {
            res.status(400).json(errors);
        } else {
            let data = { description } = req.body;
            School_Shift.update( data, { where: { uuid: req.params.id }})
            .then( result => {
                let messages = [{ message:  "Se ha actualizado su registro exitosamente." }]
                res.status(200).json( messages );
            })
            .catch ( err => {
                let e = cerrors.getErrors(err);
                res.status(400).json( e );
            })
        }
    })    
//DELETE 
  app.delete('/school-shift/:id', (req, res) => { console.log(" DELETE SCHOOL SHIFT::::::");
    School_Shift.destroy({ where: { uuid: req.params.id } })
    .then( result => {
        let messages = [{ message:  "Su registro se ha eliminado exitosamente." }]
         res.status(200).json( messages );
    })
    .catch( err => {
        let e = cerrors.getErrors(err);;
        res.status(400).json( e )
    })
  })

}
