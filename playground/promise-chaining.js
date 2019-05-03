require('../src/db/mongoose');
const User = require('../src/models/user');

// User ids to be used in e.g.
// 5ccc19bef84ab56a8ae56171
// 5ccc3aa0fce22e7ceb9f3c3d

// User.findByIdAndUpdate('5ccc3aa0fce22e7ceb9f3c3d', {age: 1}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: age});
    const count = await User.countDocuments({age: age});
    return count;
}

updateAgeAndCount('5ccc3aa0fce22e7ceb9f3c3d', 2).then(() => {
    console.log(count);
}).catch((error) => {
    console.log(error);
})