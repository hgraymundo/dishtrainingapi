module.exports = function(sequelize, Sequelize) {
    var score = sequelize.define('score', {
      uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
      },
      partial_score: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
      }
    });
    return score;
  }