const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swaggertags=['pets']
    const result = await mongodb.getDatabase().db('project2').collection('pets').find();
    result.toArray().then((pets) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets);
    });
};

const getSingle = async (req, res) => {
    //#swaggertags=['pets']
    const itemId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project2').collection('pets').find({ _id:itemId });
    result.toArray().then((pets) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets[0]);
    });
}

const createPet = async(req, res) => {
    //#swaggertags=['pets']
    const pet = {
        name: req.body.name,
        type: req.body.type,
        breed: req.body.breed,
        owner: req.body.owner,
        vet: req.body.vet,
        diet: req.body.diet,
        allergies: req.body.allergies
    };

    const response = await mongodb.getDatabase().db('project2').collection('pets').insertOne(pet);

    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some Error occurred while updating the pet.')
    };
}

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

    const response = await mongodb.getDatabase().db('project2').collection('pets').replaceOne({_id: petId}, pet);

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some Error occurred while updating the pet.')
    };
}

const deletePet = async(req, res) => {
    //#swaggertags=['pets']
    const petId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project2').collection('pets').deleteOne({_id: petId});

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