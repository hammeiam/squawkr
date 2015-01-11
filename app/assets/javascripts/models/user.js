Bitter.Models.User = Backbone.Model.extend({
	urlRoot: '/api/users',
	idAttribute: 'username',
	initialize: function(){
		var that = this;
		this.posts = new Bitter.Collections.Posts({
			user: that
		});
		this.posts.url = function(){
			// return '/api/users/' + that.id + '/posts';
			return that.url() + '/posts';
			// return '/api/posts'
		}
	}
});
