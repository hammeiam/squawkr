LairBnB.Views.HomeNav = Backbone.View.extend({
	tagName: 'nav',
	className: 'navbar navbar-default',
	template: JST['nav/show'],
	initialize: function(options){
		// this.model may not work, use Bitter.users instead
		this.listenTo(this.model, 'change', this.render);
	},

	events: {
		'click #signOut': 'signOut',
	},

	signOut: function(){
		LairBnB.users.signOut();
	},

	render: fuction(){
		var content = this.template({
			currentUser: Bitter.users.currentUser()
		});
		this.$el.html(content);
		return this;
	}

});