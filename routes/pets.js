const router = require('express').Router();

const petsController = require('../controllers/pets.js');

router.get('/', petsController.getAll);

router.get('/:id', petsController.getSingle);

router.post('/', petsController.createPet);

router.put('/:id', petsController.updatePet);

router.delete('/:id', petsController.deletePet);

module.exports = router;