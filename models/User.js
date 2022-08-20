const {Schema, model} = require('mongoose');

// creates blueprint/schema for our collection
const userSchema = new Schema({
    firstName: String,
    lastName: {
        type: String,
        trim: true,
        // required: true,
        required: [true, 'Last name must be provided'],
    },
    username: {
        type: String,
        minLength: [3, 'my err msg'],
    },
    email: {
        type: String,
        lowercase: true
    },
    age: Number,
    weapons: {
        primaryWeapon: {
            type: String,
            default: 'Baseball bat',
        },
        secondaryWeapon: {
            type: String,
            default: 'Baseball',
        }
    },
    hobbies: [
        {
            type: String,
            default: [],
        }
    ]
});

// creates and exports collection
module.exports = model('User', userSchema);