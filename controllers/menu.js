const Menu = require('../models').menu;
const subMenu = require('../models').submenu;
const Op = require('../models').Sequelize.Op

module.exports = {
    listAll(req, res) {
        const label = req.query.label;
        var condition = label ? { label: {[Op.iLike]: `%${label}%`} }: null;

        return Menu
        .findAll({
            where: condition,
            include:[{
                model: subMenu,
                as: 'submenus'
            }],
            order: [
                ['id']
            ]
        })
        .then((menu) => res.status(200).send(menu))
        .catch((error) => {res.status(400).send(error); });
    },
    
    getById(req,res) {
        return Menu
        .findByPk(req.params.id, {
            include:[{
                model: subMenu,
                as: 'submenus'
            }]
        })
        .then((menu) => {
            if (!menu) {
                return res.status(404).send({
                    message: 'Menu Not Found',
                });
            }
            return res.status(200).send(menu);
        })
        .catch((error) => res.status(400).send(error));
    },

    add(req,res) {
        return Menu
        .create({
            label: req.body.label,
            price: req.body.price,
            description: req.body.description,
        })
        .then((menu) => res.status(201).send(menu))
        .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Menu
        .findByPk(req.params.id)
        .then(menu => {
            if (!menu) {
                return res.status(404).send({
                    message: `Menu Not Found`
                });
            }
            return menu
            .update({
                label: req.body.label || menu.label,
                price: req.body.price || menu.price,
                description: req.body.description || menu.description,
            })
            .then(()=> res.status(200).send(menu))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },

    delete(req,res) {
        return Menu
        .findByPk(req.params.id)
        .then(menu => {
            if (!menu){
                return res.status(400).send({
                    message: 'Menu Not Found',
                });
            }
            return menu
            .destroy()
            .then(() => res.status(204).send({message: `Menu deleted`}))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
};