var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myblog');

var Post = require('./models/post');
var postRoutes = require('./routes/posts')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
 secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(session({
 cookie: {
   maxAge: 60000
 }
}));
app.use(flash());

require('./config/passport')(passport);
// routes ======================================================================
require('./routes/user.js')(app, passport);

var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.use(function(req, res, next){
  var user = req.user || "no user";
  console.log(user);
  next();
});

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

app.get('/contact', function(req, res) {
	res.render('contact')
})

app.use('/api', postRoutes);



app.listen(port);
console.log('Magic happens on port ' + port);


