const express = require('express');
const app = express(); //this makes 'app' a server
//const router = express.Router();
const Sequelize= require('sequelize');
const pg = require('pg');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

const models = require('./models');

//Creating the tables
models.User.sync({force: true})
.then(function () {
    console.log('User table created!');
    return models.Page.sync();
})
.then(function () {
    console.log('Page table created!');
    // app.listen(3000, function () {
    //     console.log('Server is listening on port 3000!');
    // });
})
.catch(console.error.bind(console));


//Database Sync
models.db.sync({force: true})       //'force true' recreates a new table 
.then(function () {
    console.log('All tables created!');
    // app.listen(3000, function () {
    //     console.log('Server is listening on port 3000!');
    // });
})
.catch(console.error.bind(console));



app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
const env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);



app.get('/', function (req, res){
  res.render('index.html');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
