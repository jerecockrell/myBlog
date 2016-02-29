var express = require('express');

var Post = require('../models/post');

var router = express.Router();

router.use(function(req, res, next){
  console.log('something');
  next();
});


router.route('/posts')
  .post(function(req, res){
    var post = new Post();

	post.name = req.body.name;
	post.title = req.body.title;

	post.save(function(err, post){
	  if(err){
	    res.send(err)
	  } else {
        res.json(post)
	  }
	})
  })
  .get(function(req, res){
    Post.find(function(err, posts){
	  if(err){
	    return next(err);
	  } else {
		res.json(posts)
	  }
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