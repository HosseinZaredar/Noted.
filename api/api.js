const express = require('express');
const router = express.Router();

//Routers
const signupRouter = require('./Routes/signup');
const loginRouter = require('./Routes/login');
const noteRouter = require('./Routes/note');
const usernameRouter = require('./Routes/username');


router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/note', noteRouter);
router.use('/username', usernameRouter);


module.exports = router;