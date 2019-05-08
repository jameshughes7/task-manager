const express = require ('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

// Post a task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Get a specific task
router.get('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId); 
        
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(404).send(error);
    }
})

// Updating a Task
router.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdatesArray = ['description', 'completed'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdatesArray.includes(update);
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' } )
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id);

        updates.forEach((update) => {
            task[update] = req.body[update];
        })

        await task.save();
        
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch(error) {
        res.status(404).send(error);
    }
})

// Deleting a Task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);

    } catch (error) {
        res.status(500).send();
    }
})

// Deleting Tasks
router.delete('/tasks', async (req, res) => {
    try {
        const tasks = await Task.deleteMany({})
        res.send(tasks);

    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router;