var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users_controller');



// GET /login/
router.get('/', usersController.showLogin);

// POST /login/
router.post('/', usersController.validate);

// GET /login/register
router.get('/register', usersController.showRegister);

// POST /login/register
router.post('/register', usersController.register);

// Export routes
module.exports = router;
