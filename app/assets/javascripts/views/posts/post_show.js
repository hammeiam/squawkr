Bitter.Views.PostShow = Backbone.CompositeView.extend({
	initialize: function(options){
		this.user = options.user;
		// this.collection.each(this.addPost.bind(this));
		// this.listenTo(this.collection, 'add', this.addPost);
    this.listenTo(this.model, 'sync', this.render);
  },

	template: JST['posts/show'],

  render: function(){
		var content = this.template({
			post: this.model
		});
		this.$el.html(content);
		return this;
	},
})