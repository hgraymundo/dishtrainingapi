module.exports = function(sequelize, Sequelize) {
    var subject = sequelize.define('subject', {
      uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
      },
      code: {
        type: Sequelize.STRING,
        notEmpty: true
        },
      name: {
          type: Sequelize.STRING,
          notEmpty: true
      },
      grade: {
        type: Sequelize.INTEGER,
      },
      seriation: {
        type: Sequelize.UUID
     },
    hour_teacher: {
        type: Sequelize.INTEGER,
        notEmpty: true
    },
    hour_independent: {
        type: Sequelize.INTEGER,
        notEmpty: true
    },
    credit: {
        type: Sequelize.INTEGER,
        notEmpty: true
    },
    instalation: {
        type: Sequelize.STRING,
        notEmpty: true
    },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
      }
    });
    return subject;
  }
  