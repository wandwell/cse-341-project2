const router = require('express').Router();
const {userValidationRules, validate} = require('../validator.js');

const usersController = require('../controllers/users.js');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', userValidationRules(), validate, usersController.createUser);

router.put('/:id', userValidationRules(), validate, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;