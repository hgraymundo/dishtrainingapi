var Student_address = require('../../models').student_address;
var cerrors = require('../../helpers/custom-errors');
var validate = require('../../validations/address');

module.exports = function(app) {
 
 var Object_ = Student_address;
 var object_ = 'student/address';

// CREATE
    app.post('/' + object_ , (req, res) => { console.log(" POST "+ object_ + " ::::::");
        let errors = validate.validateAddress(req);
        if( errors ) {
        res.status(400).json( errors );
        } else {
        let data = { street, colony, postal_code, municipal, state } = req.body;
        console.log(data);
        Object_.create( data )
        .then ( result => { console.log(result)
            let messages = [{ message:  "Su registro se ha creado exitosamente." }]
            res.status(200).json( messages );
        })
        .catch( err =>{ console.log( err )
            let e = cerrors.getErrors(err);
            res.status(400).json( e );
        })
        }
    })
//READ ONE by id, you can change the filter.
    app.get('/'+ object_ + '/:id', (req, res) => { console.log(" GET "+ object_ +" ::::::");
        Object_.findOne( { where: { uuid: req.params.id } , attributes: { exclude: ['createdAt', 'updatedAt'] } })
        .then( result => { console.log(result)
        res.status(200).json(result) 
        })
        .catch( err => { console.log( err )
        let e = cerrors.getErrors(err);
        res.status(400).json( e );
        })
    })
// UPDATE
    app.put('/'+ object_ +'/:id', (req, res) => { console.log(" PUT "+ object_ +" ::::::");
        let errors = validate.validateAddress(req);
        if( errors ) {
        res.status(400).json( errors );
        } else {
            let data = { street, colony, postal_code, municipal, state } = req.body;
            console.log(data);
            Object_.update( data , { where: { uuid: req.params.id } } )
        .then( result => { console.log( result )
            let messages = [{ message:  "Su registro se ha actualizado exitosamente." }]
            res.status(200).json( messages );
        })
        .catch( err => { console.log( err )
            let e = cerrors.getErrors(err);
            res.status(400).json( e );
        })
        }
    })
//DELETE
    app.delete('/'+ object_ +'/:id', (req, res) => { console.log(" DELETE "+ object_ +" ::::::");
        Object_.destroy({ where: { uuid: req.params.id } })
        .then( result => {
            let messages = [{ message:  "Su registro ha eliminado exitosamente." }]
            res.status(200).json( messages );
        })
        .catch( err => {
            let e = cerrors.getErrors(err);
            res.json( e )
        })
    })
}
