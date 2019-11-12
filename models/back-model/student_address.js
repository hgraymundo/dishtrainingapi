var bcrypt = require('bcryptjs');
module.exports = function(sequelize, Sequelize) {
    var student_address = sequelize.define('student_address', {
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
        }
    }
  );
  return student_address;
}
