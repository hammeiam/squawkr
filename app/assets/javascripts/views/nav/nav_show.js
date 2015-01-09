Bitter.Views.Nav = Backbone.View.extend({
	tagName: 'nav',
	// className: 'navbar navbar-default',
	template: JST['nav/show'],
	initialize: function(options){
		// address excessive rendering of nav
		this.listenTo(this.collection, 'sync add remove change reset', this.render);
	},

	events: {
		'click #signOut': 'signOut'
	},

	signOut: function(){
		Bitter.users.signOut();
	},

	render: function(){
		var content = this.template({
			currentUser: Bitter.users.currentUser()
		});
		this.$el.html(content);
		return this;
	}

});