var bcrypt = require('bcryptjs');

module.exports = function(sequelize, Sequelize) {
  var account = sequelize.define( 'account', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    photo:{
      type: Sequelize.TEXT,
      defaultValue: 'default'
    },
    name: {
      type: Sequelize.STRING    
    },
    lastname: {
      type: Sequelize.STRING
    },
    mlastname: {
      type: Sequelize.STRING,
    },
    birthday: {
      type: Sequelize.DATEONLY,
      validate: {
        isDate: {
          msg: 'El campo de fecha de nacimiento require el siguiente formato: YYYY-MM-DD.'
        }
      }
    },
    cellphone: {
      type: Sequelize.STRING
    },
    terms: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    email: {
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
    password: {
      type: Sequelize.STRING,
      validate: {
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/i,
          msg: "La contraseña debe tener entre 8 y 15 caracteres, con al menos una mayúscula y un número."
        }
      }
    },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      defaultValue: 'Inactive'
    },
    hash_activate: {
      type:Sequelize.TEXT,
      notNull: true
    },
    hash_recovery: {
      type:Sequelize.TEXT,
      notNull: true
    },
  },
  {
    hooks: {
      beforeCreate: (account) => {
        const salt = bcrypt.genSaltSync(13);
        account.password = bcrypt.hashSync(account.password, salt);
      }
    }
  }
  );
  return account;
}