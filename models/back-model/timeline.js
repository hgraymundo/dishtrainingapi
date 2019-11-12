module.exports = function(sequelize, Sequelize) {
    var timeline = sequelize.define('timeline', {
      uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
      },
      description: {
          type: Sequelize.STRING,
          notEmpty: true
      },
      group: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('PRE-INSCRITO', 'INSCRITO','BAJA TEMPORAL','BAJA DEFINITIVA','PASANTE','TITULADO'),
        defaultValue: 'PRE-INSCRITO' //its must be changed to inactive, to use the process of activating by email.
      }
    });
    return period;
  }
  