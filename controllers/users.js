const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swaggertags=['pets']
    try {
        const lists = await mongodb
            .getDatabase()
            .db('project2')
            .collection('users')
            .find()
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getSingle = async (req, res) => {
    //#swaggertags=['pets']
    try {
        const itemId = new ObjectId(req.params.id);
        const list = await mongodb
            .getDatabase()
            .db('project2')
            .collection('users')
            .find({ _id: itemId })
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};


const createUser = async(req, res, next) => {
    //#swaggertags=['users']
    try{
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
        };

        const response = await mongodb.getDatabase().db('project2').collection('users').insertOne(user);

        if(response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some Error occurred while updating the user.')
        };
    } catch (error) {
        next(error);
    }
}

const updateUser = async(req, res) => {
    //#swaggertags=['users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    };

    const response = await mongodb.getDatabase().db('project2').collection('users').replaceOne({_id: userId}, user);

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some Error occurred while updating the user.')
    };
}

const deleteUser = async(req, res) => {
    //#swaggertags=['users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project2').collection('users').deleteOne({_id: userId});
    
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some Error occurred while updating the user.')
    };
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};