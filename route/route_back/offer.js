var Offer = require('../../models').offer;
var School = require('../../models').school;
var Level = require('../../models').level;
var School_shift = require('../../models').school_shift;
var Syllabus = require('../../models').syllabus;

var cerrors = require('../../helpers/custom-errors');
var validate = require('../../validations/offer');

module.exports = function(app) {
 
 var Object_ = Offer;
 var object_ = 'offer';

// CREATE
    app.post('/' + object_ , (req, res) => { console.log(" POST "+ object_ + " ::::::");
        let errors = validate.validateOffer(req);
        if( errors ) {
            res.status(400).json( errors );
        } else {
            let data = { school_id, description, level_id, school_id, syllabus_id } = req.body;
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
    
    app.get('/'+ object_, (req, res) => { console.log(" GET "+ object_ +" ::::::");
        Offer.findAll( {
            where: { status: 'Active' }, //CUANDO SEA MAS DE UN PLANTEL SE REQUIRE PONER UN WHERE DEL school_id
            // attributes:  ['uuid', 'name'], 
            include: [
                {
                    model: School,
                    attributes:  ['uuid', 'name']
                } ,
                {
                    model: Level
                },
                {
                    model: School_shift
                },
                {
                    model: Syllabus
                }
            ]
            // attributes: ['uuid', 'description' ],
            // include: [
            //     { model: Offer, 
            //         attributes: ['uuid','grade','grupo'],
            //         where: { status: 'Active' },
            //         include: [{ 
            //             model: Syllabus,
            //             attributes: ['uuid','name']
            //         }
            //     ] }, 
            // ]
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
    app.get('/'+ object_ + '/byschool/:id', (req, res) => { console.log(" GET "+ object_ +" ::::::"); // id ::> school_id
        Offer.findAll( {
            where: { school_id: req.params.id, status: 'Active' }, //CUANDO SEA MAS DE UN PLANTEL SE REQUIRE PONER UN WHERE DEL school_id
            // attributes:  ['uuid', 'name'], 
            include: [
                {
                    model: School,
                    attributes:  ['uuid', 'name']                
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
//DELETE
    app.delete('/' + object_ + '/:id', (req, res) => {
        Object_.destroy({ where: { uuid: req.params.id } })
        .then( result => {
            let messages = [{ message:  "Su registro se ha eliminado exitosamente." }]
            res.status(200).json( messages );
        })
        .catch( err => {
            let e = cerrors.getErrors(err);
            res.json( e )
        })
    })

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
