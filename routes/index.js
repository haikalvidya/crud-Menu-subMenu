var express = require('express');
var router = express.Router();

const menuController = require('../controllers').menu
const subMenuController = require('../controllers').subMenu

// Get Homepage
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });

// Menu Routers
router.get('/api/menu', menuController.listAll);
router.get('/api/menu/:id', menuController.getById);
router.post('/api/menu', menuController.add);
router.put('/api/menu/:id', menuController.update);
router.delete('/api/menu/:id', menuController.delete);

// subMenu Routers
router.get('/api/submenu', subMenuController.listAll);
router.get('/api/submenu/:id', subMenuController.getById);
router.post('/api/submenu', subMenuController.add);
router.put('/api/submenu/:id', subMenuController.update);
router.delete('/api/submenu/:id', subMenuController.delete);

module.exports = router