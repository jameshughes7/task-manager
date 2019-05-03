const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

// configure express to automatically parse incoming json data
// so that we have it accessible as an object we can easily use 
// so automaically parses json as an object so we can access it
// in our request handlers
app.use(express.json());

// Post a user
app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// Get all users
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(500).send(error);
    })
})

// Get a specific user
app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    
    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(404).send();
    })
})

// Get all tasks
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

// Get a specific task
app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    
    Task.findById(taskId).then((task) => {
        if (!task) {
            return res.status(404).send();
        }
        res.send(task)
    }).catch((error) => {
        res.status(404).send(error);
    })
})

// Post a task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    
    task.save().then (() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error);
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

