const express = require('express');
const app = express();
const cors = require('cors');

//import config
require("dotenv").config();

//import database modules
const { sequelize, sequelize_test } = require('./database/database_connection');
sequelize_test(sequelize); //test database connection

//server port
const port = process.env.server_port;

//controller imports
const subscriber = require('./controllers/subscribers.js');

//json parser
app.use(express.json());

//CORS
app.use(cors(
    {
        origin: process.env.front_end_URL,
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        credentials: true
    }
));

//controller paths
app.use('/subscriber/', subscriber);

//server startup test
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})

