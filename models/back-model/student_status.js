module.exports = function(sequelize, Sequelize) {
    var student_status = sequelize.define('student_status', {
      uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM('INGRESO', 'INSCRITO', 'BAJA'),
        defaultValue: 'INGRESO' //its must be changed to inactive, to use the process of activating by email.
      },
      description: {
          type: Sequelize.Text
      }
    });
    return student_status;
  }