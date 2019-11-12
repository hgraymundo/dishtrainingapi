var bcrypt = require('bcryptjs');
// var SHA256 = require("crypto-js/sha256");
var enc = require('../helpers/encrypt');


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
    no_employee: {
      type: Sequelize.STRING    
    },
    name: {
      type: Sequelize.STRING    
    },
    surname: {
      type: Sequelize.STRING    
    },
    gender: {
      type: Sequelize.STRING
    },
    cellphone: {
      type: Sequelize.STRING,
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
    birthday: {
      type: Sequelize.DATEONLY,
      validate: {
        isDate: {
          msg: 'El campo de fecha de nacimiento require el siguiente formato: YYYY-MM-DD.'
        }
      }
    },
    terms: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING
      // validate: {
      //   is: {
      //     args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/i,
      //     msg: "La contraseña debe tener entre 8 y 15 caracteres, con al menos una mayúscula y un número."
      //   }
      // }
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
    street: {
      type: Sequelize.STRING    
    },
    colony: {
      type: Sequelize.STRING    
    },
    municipal: {
      type: Sequelize.STRING    
    },
    state: {
      type: Sequelize.STRING    
    },
  },
  {
    hooks: {
      beforeCreate: (account) => {
        const salt = bcrypt.genSaltSync(13);
        account.password = bcrypt.hashSync(account.password, salt);
        account.hash_activate = enc.encrypt(account.email);
      }
    }
  }
  );
  return account;
}