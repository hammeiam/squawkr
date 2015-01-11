Bitter.Views.PostShow = Backbone.CompositeView.extend({
	initialize: function(options){
		var navView = new Bitter.Views.Nav({
			collection: Bitter.users
		});
		this.user = options.user;
		this.addSubview('#nav-container', navView);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.user, 'sync', this.render)
  },

	template: JST['posts/show'],

  render: function(){
  	var url = '#u/' + this.user.escape('username') + '/posts/' + this.model.id
		var content = this.template({
			post: this.model,
			url: url,
			user: this.user
		});
		console.log(this.user)
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
})