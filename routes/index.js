//table of contents for our routes

const wikiRouter = require('./wiki');
const userRouter = require('./user');
const express = require('express');
const router = express.Router();

module.exports = router;

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);


