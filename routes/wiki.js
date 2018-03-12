const express = require('express');
//const app = express(); //this makes 'app' a server
const router = express.Router();

module.exports = router;

router.get('/', function(req, res, next) {
  //res.send('response to GET request to /wiki/');
  res.redirect('/'); //redirects to home page
});

router.post('/', function(req, res, next) {
  res.json(req.body);
});

router.get('/add', function(req, res, next) {
  //res.send('response to GET request to /wiki/add');
  res.render('addpage');
});
