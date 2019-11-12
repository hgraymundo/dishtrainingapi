var Object_ = require('../models').account;
var cerrors = require('../helpers/custom-errors');
var validateAccount = require('../validations/account');
var notification = require('../helpers/email');
var enc = require('../helpers/encrypt');
var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(13);


module.exports = function(app) {
 
    var object_ = 'account';

// CREATE
    app.post('/' + object_ , (req, res) => { console.log(" POST "+ object_ + " ::::::");
        let errors = validateAccount.validate(req);
        if( errors ) {
        res.status(400).json( errors );
        } else { 
        let data = { no_employee, name, surname, email, cellphone, terms, password } = req.body;
        console.log(data);
        Object_.create( data )
        .then ( result => { console.log(result.dataValues.hash_activate)
            let messages = [{ message:  "Su registro se ha creado exitosamente. Se ha enviado un correo electrónico de activación para su cuenta." }]
            res.status(200).json( messages );
            notification._send_mail(data.email, result.dataValues.hash_activate , 'active-account');
        })
        .catch( err =>{ //console.log( err )
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
        let errors = validateAccount.validate(req);
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

    app.put('/' + object_ + '/activate/:id', (req, res) => {
        Object_.update( { status: 'Active', hash_activate:''}, { where: { hash_activate: req.params.id, status: 'Inactive' } })
        .then( result => { console.log(result);
            let messages = [{ message:  "Su registro ha desactivado exitosamente." }]
            res.status(200).json( messages );
        })
        .catch( err => { console.log(err);
            let e = cerrors.getErrors(err);
            res.json( e )
        })
    })

    // RECOVERY PASSWORD
    app.post('/' + object_ + '/recovery-password' , (req, res) => { console.log(" POST "+ object_ + " ::::::");
        let errors = validateAccount.validate(req);
        if( errors ) {
        res.status(400).json( errors );
        } else { 
        let data = { email } = req.body;
        console.log(data);
        Object_.findOne( { where: { email: data.email }} )
        .then ( result => { //console.log(result.dataValues)
            if(result) {
                let hashRecovery = enc.encrypt(result.dataValues.email);
                console.log(hashRecovery);
                result.update({ hash_recovery: hashRecovery }, { where: { uuid: result.dataValues.uuid } })
                .then( result => {
                    let messages = [{ message:  "Se ha enviado un correo electrónico para la recuperación de su contraseña." }]
                    res.status(200).json( messages );
                    notification._send_mail(data.email, result.dataValues.hash_recovery , 'recovery-password');
                })
                .catch(err => { console.log(err);
                    let e = cerrors.getErrors(err);
                    res.json( e )
                })

            } else {
                let messages = [{ message:  "Se ha enviado un correo electrónico para la recuperación de contraseña." }]
                res.status(200).json( messages );
            }
            // let messages = [{ message:  "Su registro se ha creado exitosamente. Se ha enviado un correo electrónico de activación para su cuenta." }]
            // res.status(200).json( messages );
            // notification._send_mail(data.email, result.dataValues.hash_activate , 'active-account');
        })
        .catch( err =>{ //console.log( err )
            let e = cerrors.getErrors(err);
            console.log( e );
            res.status(400).json( e );
        })
        }
    })
    
    //UPDATE PASSWORD
    app.post('/' + object_ + '/new-password' , (req, res) => { console.log(" POST "+ object_ + " ::::::");
        let errors = validateAccount.validateNewPassword(req);
        if( errors ) {
            res.status(400).json( errors );
        } else { 
            let data = { password, confirm_password, hash_recovery } = req.body;
            Object_.findOne( { where: { hash_recovery: data.hash_recovery } })
            .then(result => {
                if(result) {
                    // result.password = bcrypt.hashSync(result.password, salt);
                    console.log(bcrypt.hashSync(data.password, salt));
                    result.update({ password: bcrypt.hashSync(data.password, salt), hash_recovery:'' }, { where: { uuid: result.uuid } })
                    .then( result => {
                        let messages = [{ message:  "Se ha actualizado su contraseña, de forma exitosa!." }]
                        res.status(200).json( messages );
                    })
                    .catch( err =>{ //console.log( err )
                        let e = cerrors.getErrors(err);
                        console.log( e );
                        res.status(400).json( e );
                    })
                } else {
                    let messages = [{ message:  "2 Se ha actualizado su contraseña, de forma exitosa!." }]
                        res.status(200).json( messages );
                }
            })

            // Object_.create( data )
            // .then ( result => { console.log(result.dataValues.hash_activate)
            //     let messages = [{ message:  "Su registro se ha creado exitosamente. Se ha enviado un correo electrónico de activación para su cuenta." }]
            //     res.status(200).json( messages );
            //     notification._send_mail(data.email, result.dataValues.hash_activate , 'active-account');
            // })
            // .catch( err =>{ //console.log( err )
            //     let e = cerrors.getErrors(err);
            //     console.log( e );
            //     res.status(400).json( e );
            // })
        }
    })

        


}
