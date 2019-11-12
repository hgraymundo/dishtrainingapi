var Enroll = require('../../models').enroll;
var Enroll_subjects = require('../../models').enroll_subject;
var Score = require('../../models').score;
var Partial = require('../../models').partial;


var Offer = require('../../models').offer;
var Group = require('../../models').group;

var Schedule = require('../../models').schedule;
var Syllabus = require('../../models').syllabus;
var Subject = require('../../models').subject;
var Employee = require('../../models').employee;
var Period = require('../../models').period;
var Student = require('../../models').student;

var cerrors = require('../../helpers/custom-errors');

var validate = require('../../validations/schedule');

var Sequelize = require("sequelize");
var sequelize = new Sequelize('sce', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

module.exports = function(app) {
 
var object_ = 'schedule';
var Object_ = this.Schedule;

// CREATE SCHEDULE
    app.post('/' + object_ , (req, res) => { console.log(" POST "+ object_ + " ::::::");
        let errors = validate.validateSchedule(req);
        if( errors ) {
            res.status(400).json( errors );
        } else {
            let data = req.body;
            console.log(data);
            Schedule.create( data )
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
// 
    app.get('/' + object_ + '/group/:id' , (req, res) => { console.log("GET SCHEDULE BY GROUP::::::::::::::")
    console.log(req.params.id)
        Subject.findAll({
            include:[
                {
                    model: Schedule,
                    where: {
                        group_id: req.params.id
                    },
                    include: [
                        {
                            model: Employee
                        }
                    ]
                }
            ]
        })
        .then ( result => { console.log(result)
            // let messages = [{ message:  "Su registro se ha creado exitosamente." }]
            res.status(200).json( result );
        })
        .catch( err =>{ console.log( err )
            let e = cerrors.getErrors(err);
            res.status(400).json( e );
        })
    })
//READ ONE by id, you can change the filter.
    app.get('/'+ object_ + '/student/:id', (req, res) => { console.log(" GET "+ object_ +" ::::::");
        Enroll.findOne( { 
            where: { student_id: req.params.id }, 
            attributes: ['uuid','offer_id'],
            include: [
                { 
                    model: Offer,
                    attributes: ['uuid','grade','grupo','syllabus_id'],
                    include: [
                        {
                            model: Syllabus,
                            attributes:['uuid', 'name']
                        },
                        { 
                            model: Schedule,
                            attributes:['uuid','day','start','end'],
                            include: [
                                {
                                    model: Subject,
                                    attributes:['uuid', 'code', 'name'],
                                },
                                {
                                    model: Employee,
                                    attributes:['uuid','firstname','secondname','lastname','mlastname'],

                                }
                            ]
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
//  ACADEMIC SCHEDULE
    app.get('/'+ object_ + '/academic/:id', (req, res) => { console.log(" GET "+ object_ +" ::::::");
        Subject.findAll({
            attributes: ['uuid','code', 'name'],
            include: [
                {
                    model: Schedule,
                    where: { employee_id: req.params.id },
                    attributes: ['uuid', 'day', 'start', 'end', 'employee_id'],
                    include: [
                        {
                            model: Group,
                            attributes:['uuid', 'grade', 'group'],
                            include: [
                                {
                                    model: Period,
                                    attributes:['uuid', 'description','start','ends']

                                }
                            ]
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

    // CHNGE ID for ID SESSION of employee
    app.get('/'+ object_ + '/offer/academic/:id', (req, res) => { console.log(" GET "+ object_ +" ::::::");
        Period.findOne({
            where: { status: 'Active' },
            include: [
                {
                    model: Offer,
                    
                    include: [
                        {
                            model: Partial
                        },
                        {
                            model: Schedule,
                            attributes:[],   
                            where: { employee_id: req.params.id }
                        },
                        {
                            model: Syllabus
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
    // ID is offer_id
    app.get('/'+ object_ + '/subject/academic/:id', (req, res) => { console.log(" GET "+ object_ +" SUBJECT > ACADEMIC ::::::");
        Subject.findAll({
            attributes: ['uuid', 'code', 'name'],
            include: [
                {
                    model: Schedule,
                    attributes: [],
                    where: { employee_id: "41fc5178-bad4-11e9-9891-e20e9ff0d868" } //Change for session....
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

    app.post('/' + object_ + '/student/enrolled', (req, res) => { console.log(" POST "+ object_ +" STUDENT > ENROLLED ::::::");
        console.log(req.body)
        Student.findAll({
            include:[
                {
                    model: Enroll,
                    where: { offer_id: req.body.offer_id },
                    include: [
                        {
                            model: Enroll_subjects,
                            where: { subject_id: req.body.subject_id },
                            include: [
                                {
                                    model: Subject
                                },
                                {
                                    model: Score,
                                    include: [
                                        {
                                            model: Partial
                                        }
                                    ]
                                }
                            ]

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

    // 
    app.delete('/' + object_ + '/:id', (req, res) => {
        Schedule.destroy({ where: { subject_id: req.params.id }})
        .then ( result => { console.log(result)
            let messages = [{ message:  "Su registro se ha eliminado exitosamente." }]
            res.status(200).json( messages );
        })
        .catch( err =>{ console.log( err )
            let e = cerrors.getErrors(err);
            res.status(400).json( e );
        })
    })
}
