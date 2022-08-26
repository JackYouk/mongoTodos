// imports ----------------------------------------------------------
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./controllers/apiController');

// middlewares ------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

// server listener --------------------------------------------------
app.listen(PORT, () => console.log('server up :)'));
