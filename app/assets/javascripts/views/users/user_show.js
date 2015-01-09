Bitter.Views.UserShow = Backbone.CompositeView.extend({
	initialize: function(){
		var navView = new Bitter.Views.Nav({
			collection: Bitter.users
		});
		var postsView = new Bitter.Views.PostsIndex({
			collection: this.model.posts
		})
    this.addSubview('#nav-container', navView);
    this.addSubview('#user-posts-container', postsView);
    this.listenTo(this.model, 'sync', this.render);
  },

	template: JST['users/show'],

  render: function(){
  	var posts = this.model.posts;
		var content = this.template({
			user: this.model,
			posts: posts
		});
		posts.fetch();

		this.$el.html(content);
		
		this.attachSubviews();
		return this;
	},
})