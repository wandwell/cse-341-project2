const { Pet } = require('../models/pets')
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swaggertags=['pets']
    try {
        //artificial error for testing purposes
        if (req.query.triggerError === 'true') {
            throw new Error('Artificial Error for demonstration')
        }
        const lists = await Pet.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getSingle = async (req, res) => {
    //#swaggertags=['pets']
    try {
        const petId = new ObjectId(req.params.id);
        const list = await Pet.findById(petId);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const createPet = async(req, res, next) => {
    //#swaggertags=['pets']
   try{ 
        const pet = new Pet({
            name: req.body.name,
            type: req.body.type,
            breed: req.body.breed,
            owner: req.body.owner,
            vet: req.body.vet,
            diet: req.body.diet,
            allergies: req.body.allergies
        });

        const response = await pet.save();

        if(response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some Error occurred while updating the pet.')
        };
    } catch (error) {
        next(error);
    }
};

const updatePet = async(req, res) => {
    //#swaggertags=['pets']
    const petId = new ObjectId(req.params.id);
    const pet = {
        name: req.body.name,
        type: req.body.type,
        breed: req.body.breed,
        owner: req.body.owner,
        vet: req.body.vet,
        diet: req.body.diet,
        allergies: req.body.allergies
    };

    const response = await Pet.findByIdAndUpdate(petId, pet, { new: true });
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some Error occurred while updating the pet.')
    };
}

const deletePet = async(req, res) => {
    //#swaggertags=['pets']
    const petId = new ObjectId(req.params.id);
    const response = await Pet.findByIdAndDelete(petId)

    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some Error occurred while updating the pet.')
    };
}

module.exports = {
    getAll,
    getSingle,
    createPet,
    updatePet,
    deletePet
};