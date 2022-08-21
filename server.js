// imports ----------------------------------------------------------
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./controllers/apiController');

const mongoose = require('mongoose');
const {User} = require('./models');

// mongoDB connection -----------------------------------------------
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    console.log("DB connection successful");
}).catch(err => console.log(err));

// middlewares ------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

// server listener --------------------------------------------------
app.listen(PORT, () => console.log('server up :)'));
