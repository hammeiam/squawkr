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
		this._swapView(view);
	},

	post: function(username, post_id){
		var user = Bitter.users.getOrFetch(username);
		var post = user.posts.getOrFetch(post_id);
		var view = new Bitter.Views.PostShow({
			model: post,
			user: user
		});
		this._swapView(view);
	},

	user: function(username){
		var user = Bitter.users.getOrFetch(username)
		var view = new Bitter.Views.UserShow({
			model: user
		});
		this._swapView(view);
	},

	// notFound: function(){
	// 	var view; //new Bitter.Views.Home();
	// 	this._swapView(view);
	// 	showAlert({
	// 		alertClass: 'alert-danger',
	// 		alertMessage: 'Page not found'
	// 	})
	// 	Backbone.history.navigate('', { trigger: false })
	// },

	_swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
