module.exports = (sequelize, Sequelize) => {
    const subMenu = sequelize.define("subMenu", {
        menu_id: {
            type: Sequelize.INTEGER
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
    // subMenu.associate = function(models) {
    //     subMenu.belongsTo(models.Menu, {
    //         foreignKey: 'menu_id',
    //         as: 'menu',
    //     });
    // };

    return subMenu;
};