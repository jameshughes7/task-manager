// Server downloaded on machine
// See it in /Users/hughej/mongodb-data
// Command for initialising the database
// /Users/hughej/mongodb/bin/mongod --dbpath=/Users/hughej/mongodb-data/

// Client needed to intialise connection to MongoDB
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

// Create new Global Unique ID
// Timestamp embedded in the GUID
const id = new ObjectID();
console.log(id.getTimestamp());
console.log(id.toHexString().length);

// Full IP of localhost used to prevent weird localhost issues
const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    // const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Wayne',
    //     age: 40,
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Caryn',
    //         age: 39
    //     },
    //     {
    //         name: 'James',
    //         age: 36
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         James: 'empty bin',
    //         James: 'make bed'
    //     },
    //     {
    //         Caryn: 'order groceries',
    //         Caryn: 'Make dinner'
    //     },
    //     {
    //         Gabriel: 'eat breakfast',
    //         Gabriel: 'put on cape and shield'
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks')
    //     }

    //     console.log(result.ops);
    // })
})