module.exports = function(sequelize, Sequelize) {
  var course = sequelize.define('course', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    
    name: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    shortName: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    description: {
      type: Sequelize.TEXT
    },
    start: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    end: {  
      type: Sequelize.STRING,
      notEmpty: true
    },
    image: {
      type: Sequelize.TEXT,
      notEmpty: true
    },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
    }
  });
    return course;
  }
  