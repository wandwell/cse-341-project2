const { Schema, model } = require('mongoose');

const petSchema = new Schema({
    name: String,
    type: String,
    breed: String,
    owner: String,
    vet: String,
    diet: String,
    allergies: String
}, { collection: 'pets' });

const Pet = model('Pet', petSchema);
module.exports = { Pet };
