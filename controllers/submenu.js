const subMenu = require('../models').subMenu;

module.exports = {
    listAll(req, res) {
        return subMenu
        .findAll({
            include: [],
            order: [
                ['id', 'label'],
            ],
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
            id: req.body.id,
            label: req.body.label,
            price: req.body.price,
            description: req.body.description,
            menu_id: req.body.menu_id,
        })
        .then((submenu) => res.status(201).send(submenu))
        .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return subMenu
        .findByPk(req.param.id)
        .then(submenu => {
            if (!submenu) {
                return res.status(404).send({
                    message: 'Submenu Not Found'
                });
            }
            return submenu
            .update({
                label: req.body.label || subMenu.label,
                price: req.body.price || subMenu.price,
                description: req.body.description || subMenu.description,
                menu_id: req.body.menu_id || subMenu.menu_id,
            })
            .then(()=> res.status(200).send(submenu))
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
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
};