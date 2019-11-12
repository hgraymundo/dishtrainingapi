module.exports = function(sequelize, Sequelize) {
    var role = sequelize.define('role', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
          type: Sequelize.STRING,
          notEmpty: true
      },
      code: {
        type: Sequelize.STRING,
        notEmpty: true
      },
      description: {
        type: Sequelize.STRING,
        notEmpty: true
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
      }
    });
    return role;
  }