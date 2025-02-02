const { Pet } = require('../models/pets');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs')

const getAll = async (req, res) => {
  //#swaggertags=['pets']
  try {
    if (req.query.triggerError === 'true') {
      throw new Error('Artificial Error for demonstration');
    }
    const lists = await Pet.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swaggertags=['pets']
  try {
    const petId = new ObjectId(req.params.id);
    const lists = await Pet.findById(petId);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createPet = async (req, res, next) => {
  //#swaggertags=['pets']
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const pet = new Pet({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      petname: req.body.petname,
      password: hashedPassword,
      admin: false
    });

    const response = await pet.save();

    if (response) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Some error occurred while updating the pet.');
    }
  } catch (error) {
    next(error);
  }
};

const updatePet = async (req, res) => {
  //#swaggertags=['pets']
  const petId = new ObjectId(req.params.id);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const pet = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    petname: req.body.petname,
    password: hashedPassword,
  };

  const response = await Pet.findByIdAndUpdate(petId, pet, { new: true });

  if (response) {
    res.status(200).json(response);
  } else {
    res.status(500).json('Some error occurred while updating the pet.');
  };
};

const deletePet = async (req, res) => {
  const petId = new ObjectId(req.params.id);
  const response = await Pet.findByIdAndDelete(petId);

  if (response) {
    res.status(204).send();
  } else {
    res.status(500).json('Some error occurred while deleting the pet.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createPet,
  updatePet,
  deletePet,
};
