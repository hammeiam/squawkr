Bitter.Views.PostsIndex = Backbone.CompositeView.extend({
	initialize: function(){
		// this.collection.each(this.addPost.bind(this));
		// this.listenTo(this.collection, 'add', this.addPost);
    this.listenTo(this.collection, 'sync', this.render);
  },

	template: JST['posts/index'],

  render: function(){
		var content = this.template({
			posts: this.collection
		});
		this.$el.html(content);
		var that = this;
    // _.each(this.collection, this.addPost.bind(that));
    this.collection.each(this.addPost.bind(that))
		// this.attachSubviews();
		return this;
	},

	addPost: function(post){
		console.log('posted')
  	var view = new Bitter.Views.PostsIndexItem({
  		model: post
  	});
  	this.addSubview('#user-posts', view);
  	// this.render();
  }
})