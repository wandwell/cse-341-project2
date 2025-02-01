const router = require('express').Router();
const { petValidationRules, validate} = require('../middleware/validator.js');

const petsController = require('../controllers/pets.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/', petsController.getAll);

router.post('/', isAuthenticated, petValidationRules(), validate, petsController.createPet);

router.get('/:id', petsController.getSingle);

router.put('/:id', isAuthenticated, petValidationRules(), validate, petsController.updatePet);

router.delete('/:id', isAuthenticated, petsController.deletePet);

module.exports = router;