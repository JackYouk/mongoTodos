const {Schema, model} = require('mongoose');

const hobbySchema = new Schema({
    hobby: String,
});

module.exports = model('Hobby', hobbySchema);