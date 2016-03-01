var express = require('express');
var router = express.Router();
var Twit = require('twit');

var T = new Twit({
	consumer_key:			'iKOTTAkDrp9VtM9ZYTQrJH8YQ',
	consumer_secret: 		'yzoxHpj9WM4FEmcUdTxtigtSzhHMpyPvk4DLGK5K0zydUARHFg',
	access_token:         	'704770460198637568-UNm6ZwQqI1W4vIcaAEDTThlT4aUP94k',
    access_token_secret:  	'QOOizbwF8LqUuOFmscI8bVL36yRSSBIf5kZTbYsDa4TQH',
    timeout_ms:           	60*1000,  // optional HTTP request timeout to apply to all requests.
});
// all routes prepended with 
router.route('/:keyword')
    .get(function(req, res){
      var keyword = req.params.keyword;
      T.get('search/tweets', { q: keyword + ' since:2011-07-11', count: 100 }, function(err, data, response) {
      	
     
        var myTweetsArr = data.statuses.map(function(tweet){
        	return{
        		    text: tweet.text, 
        		    screen_name: tweet.user.screen_name, 
        		    created_at: tweet.created_at,
        		    profile_image_url: tweet.user.profile_image_url
        	      }
        });
            res.json(myTweetsArr)
  })
})


module.exports = router;