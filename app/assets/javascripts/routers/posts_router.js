Bitter.Routers.Posts = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
	},

	routes: {
		'': 'front',
		'u/:username/posts/:post_id': 'post',
		'u/:username/*notFound': 'notFound',
		'u/:username': 'user',
		'*notFound': 'notFound'
	},

	front: function(){
		var view = new Bitter.Views.FrontShow();
		this._swapView(view, 'Home');
	},

	post: function(username, post_id){
		var user = Bitter.users.getOrFetch(username);
		var post = user.posts.getOrFetch(post_id);
		var view = new Bitter.Views.PostShow({
			model: post,
			user: user
		});
		this._swapView(view, 'Post: ' + post.escape('post_title'));
	},

	user: function(username){
		var user = Bitter.users.getOrFetch(username)
		var view = new Bitter.Views.UserShow({
			model: user
		});
		this._swapView(view, 'User: ' + username);
	},

	notFound: function(){
		var view = new Bitter.Views.FrontShow();
		this._swapView(view);
		showAlert({
			alertClass: 'alert-danger',
			alertMessage: 'Page not found'
		})
		Backbone.history.navigate('', { trigger: false })
	},

	_swapView: function(view, title) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
    this.trackPageview(title);
  },

  trackPageview: function (title){
  	if(!!window.ga){
	    var url = Backbone.history.getFragment();
	    //prepend slash
	    if (!/^\//.test(url) && url != ""){
	      url = "/" + url;
	    };
	    // _gaq.push(['_trackPageview', url]);
	    ga('send', 'pageview', {
			  'page': url,
			  'title': title
			});
	  };
   }
});
