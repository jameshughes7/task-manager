const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, 
    useCreateIndex: true
})

// Defining model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error ('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            } 
        }
    }
})

// Creating instance of model
const me = new User({
    name: "   James   Andrew     Hughes",
    email: '   HUGJIMBO77@GMAIL.COM   '
})

// Saving instance of model instance to the db
me.save().then(() => {
    console.log(me)
}).catch ((error) => {
    console.log(error)
})

// Define tasks model
// pass in name and then define the model
const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

// // Create new instance of model
// const dishes = new Task({
//     description: 'Dishes',
//     boolean: false
// })

// // Save model to the database
// dishes.save().then(() => {
//     console.log(dishes)
// }).catch ((error) => {
//     console.log(error)
// })
