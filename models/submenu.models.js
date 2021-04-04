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

    return subMenu;
};