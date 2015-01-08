Bitter.Models.User = Backbone.Model.extend({
	urlRoot: '/api/users',
	initialize: function(){
		this.posts = new Bitter.Collections.Posts();
		this.posts.url = '/api/users/' + this.id + '/posts'
	}
});
