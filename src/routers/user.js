const express = require ('express');
const User = require('../models/user');
const router = new express.Router();

// Post a user
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Get a specific user
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
})

// Updating a User
router.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdatesArray = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdatesArray.includes(update);
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Inavalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id);

        updates.forEach((update) => {
            user[update] = req.body[update];
        })

        await user.save();

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Deleting a User
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);

    } catch (error){
        res.status(500).send();
    }
})

// Deleting Users
router.delete('/users', async (req, res) => {
    try {
        const users = await User.deleteMany({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router;