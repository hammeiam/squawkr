Bitter.Views.PostsIndexItem = Backbone.View.extend({
	initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

	template: JST['posts/indexItem'],
	tagName: 'li',

  render: function(){
		var content = this.template({
			post: this.model
		});
		this.$el.html(content);
		return this;
	},
})