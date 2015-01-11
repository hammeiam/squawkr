Bitter.Models.Post = Backbone.Model.extend({
	initialize: function(options){
		this.user = options.user
	},
	urlRoot: function(){
		var username = this.get('user').get('username');
		return '/api/users/' + username + '/posts'
	}
});
