Bitter.Models.Post = Backbone.Model.extend({
	initialize: function(options){
		// this.user = options.user
		return this.user = options != null ? options.user : void 0;
	},
	// urlRoot: function(){
	// 	var username = this.get('user').get('username');
	// 	return '/api/users/' + username + '/posts'
	// }
	urlRoot: '/api/posts'
});
