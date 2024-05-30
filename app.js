//npm install mongoose express dotenv
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
//middleware
app.use(bodyParser.json());

//connection to mongodb

const dbURL = process.env.DATABASE_CONN_URL;
const port = process.env.PORT;

mongoose.connect(dbURL);

//handle different databse connections
mongoose.connection.on('connected', () => {
console.log('Connected to MongoDB');
});

mongoose.connection.on('error', () => {
console.error('Error connecting to MongoDB',err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
    });

    //routes for CRUD actions
    app.use('/api', require('./routes/userRoutes'));

    //start the server
    app.listen(port, () => {
        console.log('Server is running on http://localhost:'+port);
    });
