// Server downloaded on machine
// See it in /Users/hughej/mongodb-data
// Command for initialising the database
// /Users/hughej/mongodb/bin/mongod --dbpath=/Users/hughej/mongodb-data/

// Client needed to intialise connection to MongoDB
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

// Full IP of localhost used to prevent weird localhost issues
const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName);

    // db.collection('users').findOne({_id: new ObjectID("5ccae7cb45a8893b5b9821ff") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user);
    // })

    // find returns a cursor not a callback
    // which is a pointer to the data in the db
    // console log array of users matching age: 36
    // db.collection('users').find({age: 36}).toArray((error, users) => {
    //     console.log(users);
    // });
    
    // same as above but console logging count matching age: 36
    // db.collection('users').find({age: 36}).count((error, count) => {
    //     console.log(count);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         name: 'Dishes',
    //         completed: false
    //     },
    //     {
    //         name: 'Life Insurance',
    //         completed: false
    //     },
    //     {
    //         name: 'DrumKittutorial',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }
    //     console.log(result.ops);
    // })

    db.collection('tasks').findOne({_id: new ObjectID('5ccaee913f4c4a404c08e592')}, (error, task) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(task);
    })

    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        if (error) {
            return console.log('Cannot find tasks')
        }
        console.log(tasks);
    })
})