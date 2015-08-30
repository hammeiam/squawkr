Bitter.Views.FrontShow = Backbone.CompositeView.extend({
	initialize: function(){
		this.navView = new Bitter.Views.Nav({
			collection: Bitter.users
		});
		this.posts = new Bitter.Collections.Posts();
		this.postsView = new Bitter.Views.PostsIndex({
			collection: this.posts
		})
		this.listenTo(this.navView,'signoutAction', this.render)
    this.addSubview('#nav-container', this.navView);
    this.addSubview('#posts-container', this.postsView);
  },

	loggedOutTemplate: JST['frontpage/loggedOut'],

	loggedInTemplate: JST['frontpage/loggedIn'],

  render: function(){
  	if(window.currentUser){
  		var content = this.loggedInTemplate();
  		this.posts.fetch();
  		this.$el.html(content);
			this.attachSubviews();
  	} else {
  		var backgroundIdx = Math.floor(Math.random()*5 + 1);
	  	var backgroundStr = "url('https://s3-us-west-1.amazonaws.com/squawkr/hero-background-" + backgroundIdx + "-min.jpg')";
			var content = this.loggedOutTemplate({background: backgroundStr});
			this.$el.html(content);
			this.attachSubviews('#nav-container');
			this.$("a.fancybox").fancybox({
			  helpers: {
			    overlay: {
			      locked: false
			    }
			  }
			});
  	}
  	
		return this;
	},
})