const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// configure express to automatically parse incoming json data
// so that we have it accessible as an object we can easily use 
// so automaically parses json as an object so we can access it
// in our request handlers
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('5cd2a7b48f4fe5e986e8e7c9');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner); 

    const user = await User.findById('5cd2a6d651851de93c35cf41');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks)
}

main();