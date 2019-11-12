module.exports = function(sequelize, Sequelize) {
    var period_capture = sequelize.define('period_capture', {
      uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
      },
      description: {
          type: Sequelize.STRING,
          notEmpty: true
      },
      start: {
          type: Sequelize.DATEONLY,
          notEmpty: true
      },
      ends: {
          type: Sequelize.DATEONLY,
          notEmpty: true
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
      }
    });
    return period_capture;
  }
  