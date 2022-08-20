require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');
const {User} = require('./models');

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    console.log("DB connection successful");
}).catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/api/users', async (req, res) => {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            age: req.body.age,
            weapons: {
                primaryWeapon: req.body.primaryWeapon,
                secondaryWeapon: req.body.secondaryWeapon,
            },
            hobbies: [req.body.hobbies],
        });

        res.json(newUser);
    } catch (error) {
        res.status(500).json({error});
    }
});

app.get('/api/users', async (req, res) => {
    try {
        // const users = await User.find();
        const users = await User.find({
            firstName: 'jdawggg',
            username: 'zaaaaaaaaaaa',
        }, '-weapons -hobbies');

        res.json(users);
    } catch (error) {
        res.status(500).json({error});
    }
});

app.put('/api/users/:userId', async (req, res) => {
    try {
        // findByIdAndUpdate params are (id, updates, config)
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {...req.body},
            {
                new: true,
            }
        );

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({error});
    }
});

app.delete('/api/users/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({error});
    }
});

app.listen(PORT, () => console.log('server up :)'));
