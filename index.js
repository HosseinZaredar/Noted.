const express = require('express');
const app = express();
const path = require('path');
const APIRouter = require('./api/api');
const bodyParser = require('body-parser');

//seed database
const seedDB = require('./seedDB');

//express setup
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//API
app.use('/api', APIRouter);

const port = process.env.PORT || 5000;
app.listen(port);