module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define("menu", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING
        },
        label: {
            allowNull: false,
            type: Sequelize.STRING
        },
        price: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        description:{
            type: Sequelize.STRING
        },
    });

    // associations menu with submenu
    Menu.associate = models => {
        Menu.hasMany(models.subMenu, {
            foreignKey: 'menu_id',
            as: 'submenus',
        });
    };

    return Menu;
};