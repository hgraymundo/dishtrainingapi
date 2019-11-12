var Parent = require('../../models').parent;
var cerrors = require('../../helpers/custom-errors');
var validate = require('../../validations/employee');

module.exports = function(app) {
 
 var Object_ = Parent;
 var object_ = 'parent';

// CREATE
    app.post('/' + object_ , (req, res) => { console.log(" POST "+ object_ + " ::::::");
        let errors = validate.validateEmployee(req);
        if( errors ) {
        res.status(400).json( errors );
        } else {
        let data = { firstname, secondname, lastname, mlastname, birthday, gender, email, phone, cellphone } = req.body;
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
        let errors = validate.validateEmployee(req);
        if( errors ) {
        res.status(400).json( errors );
        } else {
            let data = { firstname, secondname, lastname, mlastname, birthday, curp, rfc, nss, gender } = req.body;
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
    app.post('/'+ object_ +'/disable/:id', (req, res) => { console.log(" DISABLE "+ object_ +" ::::::");
        Object_.update({ status: 'Inactive'},{ where: { uuid: req.params.id } })
        .then( result => {
            let messages = [{ message:  "Su registro ha inhabilidato exitosamente." }]
            res.status(200).json( messages );
        })
        .catch( err => {
            let e = cerrors.getErrors(err);
            res.json( e )
        })
    })

    app.post('/'+ object_ +'/enable/:id', (req, res) => { console.log(" ENABLE "+ object_ +" ::::::");
        Object_.update({ status: 'Active'},{ where: { uuid: req.params.id } })
        .then( result => {
            let messages = [{ message:  "Su registro ha habilidato exitosamente." }]
            res.status(200).json( messages );
        })
        .catch( err => {
            let e = cerrors.getErrors(err);
            res.json( e )
        })
    })
}
