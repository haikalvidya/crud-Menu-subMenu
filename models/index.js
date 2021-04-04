const dbConfig = require("../config/db.config.js")

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.menu = require("./menu.models.js")(sequelize, Sequelize);
db.submenu = require("./submenu.models.js")(sequelize, Sequelize)

// associations menu with submenu
db.menu.hasMany(db.submenu, {
    foreignKey: 'menu_id',
    as: 'submenus',
    onDelete: 'SET NULL'
});
db.submenu.belongsTo(db.menu, {
    foreignKey: 'menu_id',
    as: 'menu',
});

module.exports = db;