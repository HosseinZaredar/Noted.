const mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/database'; 

//connecting Mongoose to our MongoDB database
mongoose.connect(mongoDB, {useNewUrlParser: true})
.then(() => console.log('Connected to database.'))
.catch(() => console.log('Unable to connect to database.'));