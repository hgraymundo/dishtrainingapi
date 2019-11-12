module.exports = function(sequelize, Sequelize) {
    var parent = sequelize.define('parent', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
        type: Sequelize.ENUM('Masculino', 'Femenino'),
        validate: {
            isIn:{
                args:[['Masculino','Femenino']],
                msg: "El campo genero es Masculino o Femenino."
            }
        }
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
        phone: {
          type: Sequelize.STRING
        },
         cellphone: {
        type: Sequelize.STRING
        },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive' ),
        defaultValue: 'Active'
        // defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
      }
    });
    return parent;
  }
  