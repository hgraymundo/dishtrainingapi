const cerrors = require('../helpers/custom-errors');

exports.validateEnroll = function (req) { console.log("VALIDATIONS ::::::");
    
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
