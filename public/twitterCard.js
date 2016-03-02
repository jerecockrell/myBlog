var TwitterCard = React.createClass({
	getInitialState: function() {
      return {
      	tweets: []
      }
	},
	loadTweetsFromServer: function() {
      $.ajax({
      	url: ,
      	method: ,
      }).done(function(data){
      	self.setState({tweets, data})
      })  
	},
	componentDidMount: function() {
      this.loadTweetsFromServer()
	},
	render: function(){
		var twitterCards = this.something.map(function(item){
		return (
	      <div class="media col-sm-3">
        	<div class="media-left">
          	  <a href="#">
            	<img class="img-circle" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQaX_RufnN6vXe8SZvGzw-v0znU3Ok_aoiYIRHjIb8IOwuuGw9QEg" alt="...">
          	  </a>
        	</div>
            <div class="media-body">
              <h4 class="media-heading">@Twitter_UserName</h4>
              <p>This is going to be the content of the tweet</p>
              <p>DATE POSTED</p>
            </div>
          </div>
		)
	}
});

React.render(<TwitterCard/>,
  document.getElementById('twitter-card'));