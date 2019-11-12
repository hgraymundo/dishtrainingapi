var Subject = require('../../models').subject;
var Enroll_subject = require('../../models').enroll_subject;
var Score = require('../../models').score;

var Enroll = require('../../models').enroll;
var Student = require('../../models').student;

var Schedule = require('../../models').schedule;
var Score = require('../../models').score;
var Syllabus = require('../../models').syllabus;

var cerrors = require('../../helpers/custom-errors');
var validate = require('../../validations/offer');

module.exports = function(app) {
 
 var Object_ = Score;
 var object_ = 'score';

// CREATE
    app.post('/' + object_ , (req, res) => { console.log(" POST "+ object_ + " ::::::");
        let errors = validate.validateOffer(req);
        if( errors ) {
        res.status(400).json( errors );
        } else {
        let data = { start, end, description } = req.body;
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
    // GET ALL
    app.get('/'+ object_, (req, res) => { console.log(" GET "+ object_ +" ::::::");
        Enroll.findAll({
            include:[
                {
                    model: Enroll_subject,
                    include: [
                        {
                            model: Subject,
                        }
                    ]
                },
                {
                    model: Student
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
        let errors = validate.validateOffer(req);
        if( errors ) {
        res.status(400).json( errors );
        } else {
            let data = { start, end, description } = req.body;
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



}
