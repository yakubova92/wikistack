const express = require('express');
//const app = express(); //this makes 'app' a server
const router = express.Router();

module.exports = router;

router.get('/', function(req, res, next) {
  //res.send('response to GET request to /wiki/');
  res.redirect('/'); //redirects to home page
});

// router.post('/', function(req, res, next) {
//   res.json(req.body);
// });

router.get('/add', function(req, res, next) {
  //res.send('response to GET request to /wiki/add');
  res.render('addpage');
});

const models = require('../models');
const Page = models.Page;
const User = models.User;

router.post('/', function (req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  console.log("**** our req body!", req.body)
  const page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  // STUDENT ASSIGNMENT:s
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save();
  // -> after save ->
  res.redirect('/');
});
