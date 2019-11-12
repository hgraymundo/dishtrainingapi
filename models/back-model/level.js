module.exports = function(sequelize, Sequelize) {
  var level = sequelize.define('level', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    description: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
    }
  });
  return level;
}
