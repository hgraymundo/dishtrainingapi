var Sequelize = require("sequelize");
var sequelize = new Sequelize('bEW03aB2Dz', 'bEW03aB2Dz', 'ZrYrrUM8Rw', {
  host: 'remotemysql.com',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// ::: CATALOGOS ::: 
db.role  = require('./role.js')(sequelize, Sequelize); 
db.type_course  = require('./type_course.js')(sequelize, Sequelize); 
db.course_category  = require('./course_category.js')(sequelize, Sequelize);
db.functional_area  = require('./functional_area.js')(sequelize, Sequelize); 

db.account  = require('./account.js')(sequelize, Sequelize); 

db.course  = require('./course.js')(sequelize, Sequelize); 
db.module  = require('./module.js')(sequelize, Sequelize); // Modulo
db.activity  = require('./activity.js')(sequelize, Sequelize); // Actividad
db.document  = require('./document.js')(sequelize, Sequelize); // Documentos
db.score  = require('./score.js')(sequelize, Sequelize); // Calificación
db.enroll  = require('./enroll.js')(sequelize, Sequelize); // Calificación

// RELATIONS
//Course has many module
db.course.hasMany(db.module, { foreignKey: 'course_id', sourceKey: 'uuid'});
db.module.belongsTo(db.course, { foreignKey: 'course_id', targetKey: 'uuid'});
// Course has one course_category
db.course_category.hasMany(db.course, { foreignKey: 'course_category_id', sourceKey: 'uuid'});
db.course.belongsTo(db.course_category, { foreignKey: 'course_category_id', targetKey: 'uuid'});
// Course has one teacher
db.account.hasMany(db.course, { foreignKey: 'teacher_id', sourceKey: 'uuid'});
db.course.belongsTo(db.account, { foreignKey: 'teacher_id', targetKey: 'uuid'});
// Course has one type_course
db.type_course.hasMany(db.course, { foreignKey: 'type_course_id', sourceKey: 'uuid'});
db.course.belongsTo(db.type_course, { foreignKey: 'type_course_id', targetKey: 'uuid'});
// Course has many module
db.course.hasMany(db.module, { foreignKey: 'course_id', sourceKey: 'uuid'});
db.module.belongsTo(db.course, { foreignKey: 'course_id', targetKey: 'uuid'});
// Module has many activities
db.module.hasMany(db.activity, { foreignKey: 'module_id', sourceKey: 'uuid'});
db.activity.belongsTo(db.module, { foreignKey: 'module_id', targetKey: 'uuid'});
//Activity has many documents
db.activity.hasMany(db.document, { foreignKey: 'activity_id', sourceKey: 'uuid'});
db.document.belongsTo(db.activity, { foreignKey: 'activity_id', targetKey: 'uuid'});
// Enrolled
db.account.hasMany(db.enroll, { foreignKey: 'student_id', sourceKey: 'uuid'});
db.enroll.belongsTo(db.account, { foreignKey: 'student_id', targetKey: 'uuid'});

db.course.hasMany(db.enroll, { foreignKey: 'course_id', sourceKey: 'uuid'});
db.enroll.belongsTo(db.course, { foreignKey: 'course_id', targetKey: 'uuid'});
// Module has one score
db.module.hasOne(db.score, { foreignKey: 'module_id', targetKey: 'uuid'});
db.score.belongsTo(db.module, { foreignKey: 'module_id', targetKey: 'uuid'});

// db.employee_type.hasOne(db.employee, { foreignKey: 'type_id', targetKey: 'uuid'});
// db.employee.belongsTo(db.employee_type, { foreignKey: 'type_id', targetKey: 'uuid'});

// db.module.hasMany(db.document, { foreignKey: 'module_id', sourceKey: 'uuid'});
// db.document.belongsTo(db.module, { foreignKey: 'module_id', targetKey: 'uuid'});

/*  */
module.exports = db;
