const router = require('express').Router();
const { petValidationRules, validate} = require('../validator.js');

const petsController = require('../controllers/pets.js');

router.get('/', petsController.getAll);

router.get('/:id', petsController.getSingle);

router.post('/', petValidationRules(), validate, petsController.createPet);

router.put('/:id', petValidationRules(), validate, petsController.updatePet);

router.delete('/:id', petsController.deletePet);

module.exports = router;