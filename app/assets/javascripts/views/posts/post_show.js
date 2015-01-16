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

  events: {
  	'click #deletePostAction': 'deletePost'
  },

	template: JST['posts/show'],

  render: function(){
		var content = this.template({
			post: this.model,
			user: this.user
		});
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	deletePost: function(e){
		e.preventDefault();
		this.model.destroy({
				success: function(model, resp){
					if(!!resp['success']){
						var options = {
	          	alertClass: 'alert-success',
	          	alertMessage: 'Post deleted'
	          };
	          Backbone.history.navigate('#u/' + Bitter.users.currentUser().get('username'), { trigger: true })
	          showAlert(options);
					} else {
						resp['errors'].forEach(function(message){
	          	var options = {
	              alertClass: 'alert-warning',
	              alertMessage: message,
	            };
	            showAlert(options);
						});
					};
				}
			});
	}
})