var Object_ = require('../models').course;
var cerrors = require('../helpers/custom-errors');
var validateCourse = require('../validations/course');

module.exports = function(app) {
 
    var object_ = 'course';

// CREATE
    app.post('/' + object_ , (req, res) => { console.log(" POST "+ object_ + " ::::::");
        let errors = validateCourse.validate(req);
        if( errors ) {
        res.status(400).json( errors );
        } else { 
        let data = { description } = req.body;
        console.log(data);
        Object_.create( data )
        .then ( result => { console.log(result)
            let messages = [{ message:  "Su registro se ha creado exitosamente." }]
            res.status(200).json( messages );
        })
        .catch( err =>{ console.log( err )
            let e = cerrors.getErrors(err);
            console.log( e );
            res.status(400).json( e );
        })
        }
    })

//  READ ALL
    app.get('/'+ object_ , (req, res) => { console.log(" GET "+ object_ +" ::::::");
        Object_.findAll( { attributes: { exclude: ['createdAt', 'updatedAt'] } })
        .then( result => { console.log(result)
            res.status(200).json(result) 
        })
        .catch( err => { //console.log( err )
            let e = cerrors.getErrors(err);
            res.status(400).json( e );
        })
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
        let errors = validateCourse.validate(req);
        if( errors ) {
        res.status(400).json( errors );
        } else {
            let data = { description } = req.body;
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

    app.put('/' + object_ + '/enable/:id', (req, res) => {
        Object_.update( { status: 'Active' }, { where: { uuid: req.params.id } })
        .then( result => { console.log(result);
            let messages = [{ message:  "Su registro ha activado exitosamente." }]
            res.status(200).json( messages );
        })
        .catch( err => { console.log(err);
            let e = cerrors.getErrors(err);
            res.json( e )
        })
    })

    app.put('/' + object_ + '/disable/:id', (req, res) => {
        Object_.update( { status: 'Inactive' }, { where: { uuid: req.params.id } })
        .then( result => { console.log(result);
            let messages = [{ message:  "Su registro ha desactivado exitosamente." }]
            res.status(200).json( messages );
        })
        .catch( err => { console.log(err);
            let e = cerrors.getErrors(err);
            res.json( e )
        })
    })

}
