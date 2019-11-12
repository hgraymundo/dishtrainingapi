var Employee_Type = require('../../models').employee_type;

var cerrors = require('../../helpers/custom-errors');
var validate = require('../../validations/employee_type');

module.exports = function(app) {
 
 var Object_ = Employee_Type;
 var object_ = 'employee_type';

// CREATE
    // app.post('/' + object_ , (req, res) => { console.log(" POST "+ object_ + " ::::::");
    //     let errors = validate.validateEmployeeType(req);
    //     if( errors ) {
    //     res.status(400).json( errors );
    //     } else {
    //     let data = { firstname, secondname, lastname, mlastname, birthday, curp, rfc, nss, gender } = req.body;
    //     console.log(data);
    //     Object_.create( data )
    //     .then ( result => { console.log(result)
    //         let messages = [{ message:  "Su registro se ha creado exitosamente." }]
    //         res.status(200).json( messages );
    //     })
    //     .catch( err =>{ console.log( err )
    //         let e = cerrors.getErrors(err);
    //         res.status(400).json( e );
    //     })
    //     }
    // })
//READ ALL EMPLOYEE.
        app.get('/'+ object_ , (req, res) => { console.log(" GET "+ object_ +" ::::::");
            Object_.findAll( { attributes: { exclude: ['createdAt', 'updatedAt'] }})
                .then( result => { console.log(result)
                res.status(200).json(result) 
            })
            .catch( err => { console.log( err )
                let e = cerrors.getErrors(err);
                res.status(400).json( e );
            })
        })
//READ ONE by id, you can change the filter.
    // app.get('/'+ object_ + '/:id', (req, res) => { console.log(" GET "+ object_ +" ::::::");
    //     Object_.findOne( { where: { uuid: req.params.id } , attributes: { exclude: ['createdAt', 'updatedAt'] } })
    //     .then( result => { console.log(result)
    //     res.status(200).json(result) 
    //     })
    //     .catch( err => { console.log( err )
    //     let e = cerrors.getErrors(err);
    //     res.status(400).json( e );
    //     })
    // })
// UPDATE
    // app.put('/'+ object_ +'/:id', (req, res) => { console.log(" PUT "+ object_ +" ::::::");
    //     let errors = validate.validateEmployee(req);
    //     if( errors ) {
    //     res.status(400).json( errors );
    //     } else {
    //         let data = { firstname, secondname, lastname, mlastname, birthday, curp, rfc, nss, gender } = req.body;
    //         console.log(data);
    //         Object_.update( data , { where: { uuid: req.params.id } } )
    //     .then( result => { console.log( result )
    //         let messages = [{ message:  "Su registro se ha actualizado exitosamente." }]
    //         res.status(200).json( messages );
    //     })
    //     .catch( err => { console.log( err )
    //         let e = cerrors.getErrors(err);
    //         res.status(400).json( e );
    //     })
    //     }
    // })
   
}
