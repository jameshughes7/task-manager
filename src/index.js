const express = require('express');
require('./db/mongoose');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// configure express to automatically parse incoming json data
// so that we have it accessible as an object we can easily use 
// so automaically parses json as an object so we can access it
// in our request handlers
app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.send(user);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

