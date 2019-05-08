const express = require ('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

// SignUp
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({
            user: user.getPublicProfile(),
            token: token
        })
    } catch (error) {
        res.status(400).send(error);
    }
})

// Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({
            user: user,
            token: token
        })
        res.send(user);
    } catch (error) {
        res.status(400).send();
    }
})

// Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

// Logout all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

// Get all users
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

// Updating a User
router.patch('/users/me', auth, async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdatesArray = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdatesArray.includes(update);
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Inavalid updates!' })
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        })

        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Deleting a User
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.delete();
        res.send(req.user);
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