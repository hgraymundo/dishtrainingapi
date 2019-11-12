var Group = require('../../models').group;
var Period = require('../../models').period;
var Offer = require('../../models').offer;
var School_Shift = require('../../models').school_shift;
var Schedule = require('../../models').schedule;
var Employee = require('../../models').employee;
var Subject = require('../../models').subject;

var cerrors = require('../../helpers/custom-errors');
var validate = require('../../validations/group');

module.exports = function(app) {
 
 var Object_ = Group;
 var object_ = 'group';

// CREATE
    app.post('/' + object_ , (req, res) => { console.log(" POST "+ object_ + " ::::::");
        let errors = validate.validateGroup(req);
        if( errors ) {
            res.status(400).json( errors );
        } else {
            let data = { grade, group, offer_id, period_id } = req.body;
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
        Object_.findAll( { 
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: Period
                    },
                    {
                        model: Offer,
                        include: [
                            {
                                model: School_Shift
                            }
                        ]
                    }
                ]
            })
            .then( result => { console.log(result)
                res.status(200).json(result) 
            })
            .catch( err => { console.log( err )
                let e = cerrors.getErrors(err);
                res.status(400).json( e );
            })
    })

//READ ONE by id, you can change the filter.
    app.get('/'+ object_ + '/:id', (req, res) => { console.log(" GET "+ object_ +" ::::::");
    console.log(req.params.id)
        Object_.findOne( { where: { uuid: req.params.id } , 
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: Offer,
                    include: [
                        {
                            model: School_Shift
                        }
                    ]
                }
            ]
        })
        .then( result => { console.log(result.uuid)
            
            res.status(200).json(result) 

        })
        .catch( err => { console.log( err )
        let e = cerrors.getErrors(err);
        res.status(400).json( e );
        })
    })
// 

//Read groups by period and offer
app.post('/'+ object_ +'/byOffer', (req, res) => { console.log(" PUT "+ object_ +" ::::::"); 
    let errors = validate.validateGroup(req);
    if( errors ) {
    res.status(400).json( errors );
    } else {
        Object_.findAll({ where: { offer_id: req.body.offer_id, period_id: req.body.period_id } })
        .then( result => { console.log(result.uuid)
            res.status(200).json(result) 
        })
        .catch(err => { console.log( err )
            let e = cerrors.getErrors(err);
            res.status(400).json( e );
        })
    }
})
    
// UPDATE
    app.put('/'+ object_ +'/:id', (req, res) => { console.log(" PUT "+ object_ +" ::::::");
        let errors = validate.validateGroup(req);
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
}
