module.exports = function(sequelize, Sequelize) {
  var school = sequelize.define('school', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.TEXT
    },
    code: {
      type: Sequelize.STRING
    },
    director: {
      type: Sequelize.TEXT
    },
    assistant: {
      type: Sequelize.TEXT
    },
    logo: {
      type: Sequelize.TEXT,
      notNull: true,
      defaultValue: 'default'
    },
    phone: {
      type: Sequelize.STRING,
    },
    phone2: {
      type: Sequelize.STRING,
    },
    street: {
      type: Sequelize.STRING,
      notNull: true,
    },
    colony: {
      type: Sequelize.STRING      
    },
    municipal: {
      type: Sequelize.STRING    
    },
    state: {
      type: Sequelize.STRING    
    },
    postal_code: {
      type: Sequelize.TEXT,
      notNull: true
    },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
    }
  });
  return school;
}
