Bitter.Models.Post = Backbone.Model.extend({
	urlRoot: function(){
		var username = this.get('user').get('username');
		return '/api/users/' + username + '/posts'
	}
});
