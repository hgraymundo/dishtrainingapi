var bcrypt = require('bcryptjs');
module.exports = function(sequelize, Sequelize) {
    var employee_address = sequelize.define('employee_address', {
        uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        street: {
          type: Sequelize.STRING
        },
        colony: {
          type: Sequelize.STRING
        },
        postal_code: {
          type: Sequelize.STRING
        },
        municipal: {
          type: Sequelize.STRING
        },
        state: {
          type: Sequelize.STRING
        },
        country: {
          type: Sequelize.STRING,
          defaultValue: "México"
        },
        status: {
          type: Sequelize.ENUM('Active', 'Inactive'),
          defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
        }
    }
  );
  return employee_address;
}
