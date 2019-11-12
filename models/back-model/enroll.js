module.exports = function(sequelize, Sequelize) {
  var enroll = sequelize.define('enroll', {
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
    }
  });
  return enroll;
}