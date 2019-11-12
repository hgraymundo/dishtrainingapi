module.exports = function(sequelize, Sequelize) {
    var employee = sequelize.define('employee', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        photo: {
          type: Sequelize.STRING,
          notEmpty: true
        },
        curp: {
          type: Sequelize.STRING,
          unique: {
            msg: 'El curp ya está en uso.'
          }
        },
        rfc: {
          type: Sequelize.STRING,
          unique: {
            msg: 'El rfc ya está en uso.'
          }
        },
        nss: {
          type: Sequelize.STRING,
          unique: {
            msg: 'El nss ya está en uso.'
          }
        },
        name: {
          type: Sequelize.STRING,
          notEmpty: true
        },
        
        lastname: {
          type: Sequelize.STRING,
          notEmpty: true
        },
        mlastname: {
          type: Sequelize.STRING,
          notEmpty: true
        },
        birthday: {
          type: Sequelize.STRING,
          notEmpty: true
        },
        gender: {
          type: Sequelize.ENUM('Masculino', 'Femenino')
        },
        phone: {
          type: Sequelize.STRING
        },
        email: { //TODO: CHECAR ESTA VALIDACION NO ESTA VALIDANDO
          type: Sequelize.STRING,
          validate: {
            isEmail: {
              msg: 'El correo electrónico no es válido.'
            },
          },
          unique: {
            msg: 'El correo electrónico ya está en uso.'
          }
        },
        cellphone: {
          type: Sequelize.STRING
        },
        status: {
          type: Sequelize.ENUM('Active', 'Inactive'),
          defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
        }
    }
  );
  return employee;
}
