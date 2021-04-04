module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define("menu", {
        label: {
            allowNull: false,
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        },
        description:{
            type: Sequelize.STRING
        },
    });
    return Menu;
};