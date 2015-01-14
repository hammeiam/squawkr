Bitter.Views.FrontShow = Backbone.CompositeView.extend({
	initialize: function(){
		var navView = new Bitter.Views.Nav({
			collection: Bitter.users
		});
    this.addSubview('#nav-container', navView);
  },

	template: JST['frontpage/show'],

  render: function(){
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		this.$("a.fancybox").fancybox({
		  helpers: {
		    overlay: {
		      locked: false
		    }
		  }
		});
		return this;
	},
})