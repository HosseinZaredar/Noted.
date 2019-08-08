const express = require('express');
const path = require('path');
const APIRouter = require('./api/api');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//API
app.use('/api', APIRouter);

const port = process.env.PORT || 5000;
app.listen(port);