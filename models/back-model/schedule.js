module.exports = function(sequelize, Sequelize) {
    var schedule = sequelize.define('schedule', {
      uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
      },
      day: {
        type: Sequelize.ENUM('LUNES', 'MARTES', 'MIERCOLES','JUEVES','VIERNES','SABADO','DOMINGO')
      },
      start: {
        type: Sequelize.STRING
      },
      end: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
      },
      employee_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'uuid',
        },
        onDelete: 'restrict'
      }
    });
    return schedule;
  }