module.exports = function(sequelize, Sequelize) {
  var syllabus = sequelize.define('syllabus', {
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
    mode: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    background: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    duration: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    measure: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    no_measure: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
      }
    });
    return syllabus;
  }