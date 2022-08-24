const {Schema, model} = require('mongoose');

const todoSchema = new Schema({
    todo: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

module.exports = model('Todo', todoSchema);