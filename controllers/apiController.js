const router = require('express').Router();

// create a user POST route
router.post('/users', async (req, res) => {
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

// get users GET route
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        // const users = await User.find({
        //     firstName: 'jdawggg',
        //     username: 'zaaaaaaaaaaa',
        // }, '-weapons -hobbies');

        res.json(users);
    } catch (error) {
        res.status(500).json({error});
    }
});

// delete a user by id DELETE route
router.delete('/users/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({error});
    }
});

// update a user by id PUT route
router.put('/users/:userId', async (req, res) => {
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

// update a users hobbies array by userId PUT route
router.put('/users/addHobby/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.hobbies.push(...req.body.hobby);
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({error});
    }
});

module.exports = router;