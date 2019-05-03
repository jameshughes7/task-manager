const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, 
    useCreateIndex: true
})

// Defining model
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// Creating instance of model
const me = new User({
    name: 'James',
    age: 36
})

// Saving instance of model instance to the db
me.save().then(() => {
    console.log(me)
}).catch ((error) => {
    console.log(error)
})