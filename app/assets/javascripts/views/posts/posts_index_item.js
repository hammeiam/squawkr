Bitter.Views.PostsIndexItem = Backbone.View.extend({
	initialize: function(options){
		this.user = options.user;
    this.listenTo(this.model, 'sync', this.render);
  },

	template: JST['posts/indexItem'],
	tagName: 'li',

  render: function(){
  	var url = '#u/' + this.user.escape('username') + '/posts/' + this.model.id
		var content = this.template({
			post: this.model,
			url: url
		});
		this.$el.html(content);
		return this;
	},
})