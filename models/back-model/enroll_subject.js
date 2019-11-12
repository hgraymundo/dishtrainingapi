module.exports = function(sequelize, Sequelize) {
    var enroll_subject = sequelize.define('enroll_subject', {
      uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
      },
      enroll_id: {
        type: Sequelize.UUID,
      },
      subject_id: {
        type: Sequelize.UUID,
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        defaultValue: 'Active' //its must be changed to inactive, to use the process of activating by email.
      }
    });
    return enroll_subject;
  }