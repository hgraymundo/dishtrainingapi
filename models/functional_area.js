module.exports = function(sequelize, Sequelize) {
    var functional_area = sequelize.define('functional_area', {
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
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
      }
    });
    return functional_area;
  }