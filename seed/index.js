require('dotenv').config();

const {User, Todo} = require('../models');
const users = require('./users');
const todos = require('./todos');
const mongoose = require('mongoose');

const seeder = async () => {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);

    await Todo.deleteMany();
    await User.deleteMany();

    const seededUsers = await User.insertMany(users);

    todos.forEach((todo, index) => {
        if(index === 0 || index === 1){
            todo.userId = seededUsers[0]._id;
        }

        if(index === 2 || index === 3){
            todo.userId = seededUsers[1]._id;
        }

        if(index === 4 || index === 5){
            todo.userId = seededUsers[2]._id;
        }
    });

    await Todo.insertMany(todos);

    const foundTodos = await Todo.find().populate({
        path: 'userId',
        select: '-email -age',
    });
    console.log(foundTodos);

    process.exit(0);
};

seeder();