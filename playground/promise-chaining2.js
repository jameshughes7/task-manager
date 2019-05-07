require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task id to be deleted in the e.g.
// 5ccc528d491ed48a557bb217

Task.findByIdAndDelete('5ccc528d491ed48a557bb217').then((task) => {
    console.log(task);
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error);
})


const deleteTaskAndCount = async (id) => {
    const taskToDelete = await Task.findByIdAndDelete(id);
    console.log(taskToDelete);
    const count = await Task.countDocuments({completed: false})
    return count;
}

deleteTaskAndCount('5ccc526d491ed48a557bb216').then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
})