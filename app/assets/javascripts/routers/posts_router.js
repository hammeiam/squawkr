Bitter.Routers.Posts = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
	},

	routes: {
		'': 'front',
		'/:username/:post_id': 'post',
		'/:username': 'user',
		'*notFound': 'notFound'
	},

	front: function(){
		var view = new Bitter.Views.FrontPage();
		this._swapView(view);
	},

	post: function(username, post_id){
		var user = Bitter.users.getOrFetch
		var post = Bitter.posts.getOrFetch(post_id)
	},

	user: function(username){

	},

	notFound: function(){
		var view = new LairBnB.Views.Home();
		this._swapView(view);
		showAlert({
			alertClass: 'alert-danger',
			alertMessage: 'Page not found'
		})
		Backbone.history.navigate('', { trigger: false })
	},

	_swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
