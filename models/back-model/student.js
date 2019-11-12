module.exports = function(sequelize, Sequelize) {
  var student = sequelize.define('student', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    photo: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    no_control: {
      type: Sequelize.STRING
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
    curp: {
      type: Sequelize.STRING,
      unique: {
        msg: 'El curp ya está en uso.'
      }
    },
    gender: {
      type: Sequelize.ENUM('Masculino', 'Femenino')
    },
    email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: {
            msg: 'No es un correo electrónico válido.'
          },
        },
        unique: {
          msg: 'El correo electrónico ya existe.'
        }
    },
    origin: {
      type: Sequelize.STRING
    },
    cellphone: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM('PRE-INSCRITO', 'INSCRITO','BAJA TEMPORAL','BAJA DEFINITIVA','PASANTE','TITULADO'),
      defaultValue: 'PRE-INSCRITO' //its must be changed to inactive, to use the process of activating by email.
    }
  });
  return student;
}
