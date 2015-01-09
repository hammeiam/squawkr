Bitter.Views.UserShow = Backbone.CompositeView.extend({
	initialize: function(){
		var navView = new Bitter.Views.Nav({
			collection: Bitter.users
		});
    this.addSubview('#nav-container', navView);
  },

	template: JST['users/show'],

  render: function(){
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		
		this.attachSubviews();
		return this;
	},
})