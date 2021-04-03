module.exports = (sequelize, Sequelize) => {
    const subMenu = sequelize.define("subMenu", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING
        },
        menu_id: {
            allowNull: false,
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

    // associations submenu with menu
    subMenu.associate = models => {
        subMenu.belongsTo(models.Menu, {
            foreignKey: 'menu_id',
            as: 'menu',
        });
    };

    return subMenu;
};