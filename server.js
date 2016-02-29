var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myblog');

var Post = require('./models/post');
var postRoutes = require('./routes/posts')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.set('view engine', 'ejs')

var router = express.Router();


router.use(function(req, res, next) {
	console.log('Sumthin be happenin, yo.');
	next();
});

app.get('/', function(req, res) {
	res.render('index')
})

app.get('/blog', function(req, res) {
	Post.find(function(err, post){
	  if(err){
	    console.log(err);
	  } else {
	  	res.render('blog', {post: post})
	  }
    })
})

app.get('/aboutblog', function(req, res) {
	res.render('aboutblog')
})

app.use('/api', postRoutes);



app.listen(port);
console.log('Magic happens on port ' + port);


