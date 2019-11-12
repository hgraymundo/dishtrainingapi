module.exports = function(sequelize, Sequelize) {
    var group = sequelize.define('group', {
      uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
      },
      grade: {
          type: Sequelize.INTEGER,
          notEmpty: true
      },
      group: {
        type: Sequelize.STRING,
        notEmpty: true
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
      }
    });
    return group;
  }