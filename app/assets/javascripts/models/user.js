Bitter.Models.User = Backbone.Model.extend({
	urlRoot: '/api/users',
	idAttribute: 'username',
	initialize: function(){
		this.posts = new Bitter.Collections.Posts();
		this.posts.url = '/api/users/' + this.username + '/posts'
	}
});
