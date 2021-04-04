const Menu = require('../models').menu;
const subMenu = require('../models').submenu;

module.exports = {
    listAll(req, res) {
        return Menu
        .findAll({
            include:[{
                model: subMenu,
                as: 'submenus'
            }]
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
            // id: req.body.id,
            label: req.body.label,
            price: req.body.price,
            description: req.body.description,
        })
        .then((menu) => res.status(201).send(menu))
        .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Menu
        .findByPk(req.param.id)
        .then(menu => {
            if (!menu) {
                return res.status(404).send({
                    message: 'Menu Not Found'
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
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
};