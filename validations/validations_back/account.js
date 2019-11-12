const cerrors = require('../../helpers/custom-errors');

exports.validateAccountCreation = function (req) { console.log("ACCOUNT VALIDATIONS ::::::");
    req.checkBody("email", 'El campo de correo electrónico es obligatorio').isEmail().withMessage("El campo de correo electrónico no es válido.");
    req.checkBody("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/).trim().withMessage('La contraseña debe tener entre 6 y 15 caracteres, con al menos una mayúscula y un número.');
    req.checkBody("confirm_password","La confirmación de la contraseña no coincide con la contraseña.").equals(req.body.password);
    req.checkBody("terms","Es necesario aceptar los términos y condiciones.").equals('true');
    var errors = req.validationErrors();
    if(errors) { 
        let err = cerrors.getErrors(errors, "default");  console.log(err) 
        return err;
    } else {
        return false;
    }   
}

exports.validateAccountUpdate = function (req) { console.log("ACCOUNT VALIDATIONS ::::::");
    req.checkBody("name", 'El nombre es requerido, mínimo 3 caracteres').notEmpty().isLength({ min: 3 }).trim().escape();
    req.checkBody("lastname", 'El nombre es requerido, mínimo 3 caracteres').notEmpty().isLength({ min: 3 }).trim().escape();
    req.checkBody("mlastname").trim().escape().isWhitelisted(['SELECT', 'FROM','UPDATE', 'DELETE', 'WHERE']).withMessage('El apellido materno contiene caracteres no válidos');
    req.checkBody("birthday").trim().escape();
    req.checkBody("cellphone").trim().escape();
    var errors = req.validationErrors();
    if(errors) { 
        let err = cerrors.getErrors(errors, "default");  console.log(err) 
        return err;
    } else {
        return false;
    }   
}

  //   req.checkBody("email", 'Email is required').isEmail().withMessage("E-mail not valid");
  //   req.checkBody("firstname", 'Firstname is required, 3 characters minimum').notEmpty().isLength({ min: 3 }).trim().escape();
  //   //more strong
  //   req.checkBody("birthday").matches(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).withMessage('The birthday field require the next format: YYYY-MM-DD');
  //   //req.checkBody("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/).trim().withMessage('The password must be between 6-15 characters long, with at least one uppercase, one number and one special character.');
  //   req.checkBody("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/).trim().withMessage('The password must be between 6-15 characters long, with at least one uppercase and one number.');
  //   req.checkBody("confirm_password","The confirmation of the password does not match the password").equals(req.body.password);
  //   req.checkBody("telephone").matches(/^01-\d{3}-\d{7}$/).trim().withMessage("The format of the telephone field is: 01-###-#######");
  //   req.checkBody("cellphone").matches(/^\d{3}-\d{3}-\d{7}$/).trim().withMessage("The format of the cellphone field is: ###-###-#######");
  //   req.checkBody("hour").matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).trim().withMessage("The format of the hour field is : ##:## , 24hrs format");
