module.exports = function(sequelize, Sequelize) {
    var activity = sequelize.define('activity', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
          type: Sequelize.STRING,
          notEmpty: true
      },
      description: {
        type: Sequelize.STRING,
        notEmpty: true
      },
      start: {
        type: Sequelize.STRING
      },
      end: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
      }
    });
    return activity;
  }