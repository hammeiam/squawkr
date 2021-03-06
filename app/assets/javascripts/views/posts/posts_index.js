Bitter.Views.PostsIndex = Backbone.CompositeView.extend({
	initialize: function(options){
		this.user = options.user;
    this.listenTo(this.collection, 'sync', this.render);
  },

	template: JST['posts/index'],

  render: function(){
		var content = this.template({
			posts: this.collection
		});
		this.$el.html(content);
		var that = this;
    this.collection.each(this.addPost.bind(that))
		return this;
	},

	addPost: function(post){
  	var view = new Bitter.Views.PostsIndexItem({
  		model: post,
  		user: this.user
  	});
  	this.addSubview('#user-posts', view);
  }
})