const Menu = require('../models').menu;
const subMenu = require('../models').submenu;
const Op = require('../models').Sequelize.Op;

module.exports = {
    listAll(req, res) {
        const label = req.query.label;
        var condition = label ? { label: {[Op.iLike]: `%${label}%`} }: null;

        return subMenu
        .findAll({
            where: condition,
            order: [
                ['id']
            ]
        })
        .then((submenus) => res.status(200).send(submenus))
        .catch((error) => {res.status(400).send(error); });
    },
    
    getById(req,res) {
        return subMenu
        .findByPk(req.params.id)
        .then((submenu) => {
            if (!submenu) {
                return res.status(404).send({
                    message: 'Submenu Not Found',
                });
            }
            return res.status(200).send(submenu);
        })
        .catch((error) => res.status(400).send(error));
    },

    add(req,res) {
        return subMenu
        .create({
            label: req.body.label,
            price: req.body.price,
            description: req.body.description,
            menu_id: req.body.menu_id,
        })
        .then((submenu) => {
            return Menu
            .findByPk(req.body.menu_id)
            .then(menu => {
                if (!menu) {
                    return res.status(404).send({
                        submenu,
                        message: `Submenu created, but Menu Not Found`
                    });
                }
                return menu
                .update({
                    price: (req.body.price + menu.price),
                })
                .then(()=> res.status(201).send(submenu))
                .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send({
                submenu,
                message: `Submenu created, but Menu Not Found`
            }));
        })
        .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return subMenu
        .findByPk(req.params.id)
        .then(submenu => {
            if (!submenu) {
                return res.status(404).send({
                    message: 'Submenu Not Found'
                });
            }
            // get submenu price before updated
            submenu_price = submenu.price
            return submenu
            .update({
                label: req.body.label || submenu.label,
                price: req.body.price || submenu.price,
                description: req.body.description || submenu.description,
                menu_id: req.body.menu_id || submenu.menu_id,
            })
            .then(()=> {
                return Menu
                .findByPk(submenu.menu_id)
                .then(menu => {
                    if (!menu) {
                        return res.status(404).send({
                            submenu,
                            message: `Submenu updated, but Menu Not Found`
                        });
                    }
                    return menu
                    .update({
                        price: menu.price + req.body.price - submenu_price,
                    })
                    .then(()=> res.status(200).send(submenu))
                    .catch((error) => res.status(400).send({
                        submenu,
                        message: `Submenu updated, but Menu Not Found`
                    }));
                })
            })
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },

    delete(req,res) {
        return subMenu
        .findByPk(req.params.id)
        .then(submenu => {
            if (!submenu){
                return res.status(400).send({
                    message: 'Submenu Not Found',
                });
            }
            return submenu
            .destroy()
            .then(() => {
                return Menu
                .findByPk(submenu.menu_id)
                .then(menu => {
                    if (!menu) {
                        return res.status(404).send({
                            message: `Submenu deleted`
                        });
                    }
                    return menu
                    .update({
                        price: (menu.price - submenu.price),
                    })
                    .then(()=> res.status(204).send({message: `Submenu deleted`}))
                    .catch((error) => res.status(400).send(error));
                })
            })
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
};