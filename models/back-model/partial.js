module.exports = function(sequelize, Sequelize) {
    var partial = sequelize.define('partial', {
      uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
      },
      no_partial: {
        type: Sequelize.INTEGER
      },
      start: {
          type: Sequelize.DATE
      },
      end: {
          type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
      }
    });
    return partial;
  }