const express = require('express');
const router = express.Router();

//Routers
const signupRouter = require('./Routes/signup');
const loginRouter = require('./Routes/login');
const noteRouter = require('./Routes/note');
const trashRouter = require('./Routes/trash');
const usernameRouter = require('./Routes/username');


router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/note', noteRouter);
router.use('/trash', trashRouter);
router.use('/username', usernameRouter);


module.exports = router;