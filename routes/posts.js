var express = require('express');
var User = require('../models/user');
var Post = require('../models/post');

//var anonUser = { local}

var router = express.Router();

router.use(function(req, res, next){
  console.log('something');
  next();
});


router.route('/posts')
  .get(function(req, res){

    Post.find()
    .populate('author')
    .exec(function(err, posts){
    if(err){
      return next(err);
    } else {
    res.json(posts)
    }
  })
  
  .post(function(req, res){
  
  var user = req.user || "no user";
  console.log(user);
  
  var post = new Post();

	post.name = req.body.name;
	post.title = req.body.title || 'none';
  post.content = req.body.content || 'none';
  post.author = req.body.author || 'none';
  post.image = req.body.image || 'none';

  post.author = req.user._id || "56d0e3e8a976fce904000001";

  console.log(post.author);

	post.save(function(err, post){
	  if(err){
	    res.send(err)
	  } else {
        res.json(post)
	  }
	})
  })
  
  });

router.route('/posts/:post_id')
  .get(function(req, res){
    Post.findById(req.params.post_id, function(err, post){
	  if(err){
	    console.log(err);
	  } else {
	  	res.json(post);
	  }
    })
  })
  .put(function(req, res){
  	Post.findById(req.params.post_id, function(err, post){
  	  if(err){
  	  	console.log(err)
  	  } else {
  	  	post.name = req.body.name || post.name;
  	  	post.title = req.body.title || post.title;

  	  	post.save(function(err){
  	  	  if(err){
  	  	  	console.log(err)
  	  	  } else {
  	  	  	res.json({title: "post updated"})
  	  	  }
  	  	})
  	  }
  	})
  })
  .delete(function(req, res){
  	Post.remove({_id: req.params.post_id}, function(err, post){
  	  if(err){
  	  	console.log(err)
  	  } else {
  	  	res.json({title: 'post deleted!'})
  	  }
  	})
  });

module.exports = router;