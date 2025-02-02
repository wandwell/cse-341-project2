const { User } = require('../models/users');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs')

const getAll = async (req, res) => {
  //#swaggertags=['users']
  try {
    if (req.query.triggerError === 'true') {
      throw new Error('Artificial Error for demonstration');
    }
    const lists = await User.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swaggertags=['users']
  try {
    const userId = new ObjectId(req.params.id);
    const lists = await User.findById(userId);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createUser = async (req, res, next) => {
  //#swaggertags=['users']
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
    });

    const response = await user.save();

    if (response) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Some error occurred while updating the user.');
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res) => {
  //#swaggertags=['users']
  const userId = new ObjectId(req.params.id);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: hashedPassword,
  };

  const response = await User.findByIdAndUpdate(userId, user, { new: true });

  if (response) {
    res.status(200).json(response);
  } else {
    res.status(500).json('Some error occurred while updating the user.');
  };
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await User.findByIdAndDelete(userId);

  if (response) {
    res.status(204).send();
  } else {
    res.status(500).json('Some error occurred while deleting the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
