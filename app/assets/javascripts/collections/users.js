Bitter.Collections.Users = Backbone.Collection.extend({
	url: '/api/users',
  model: Bitter.Models.User,

  getOrFetch: function(username_id){
  	var model = this.get(username_id);
  	var that = this;
  	if(!model){
      model = new Bitter.Models.User({ username: username_id });
  		model.fetch({
  			success: function(){ that.add(model) }
  		})
  	} else {
      model.fetch();
    }
  	return model;
  },

  currentUser: function(){
    return this.findWhere({ logged_in: true }) || null;
  },

  signOut: function(){
    var cu = this.currentUser();
    window.currentUser = null;
    var options = {};
    if(!!cu){
      $.ajax({
        url: "/session",
        type: "DELETE",
        success: function(resp){
          cu.set( { logged_in: false });
          cu.fetch();
          options['alertClass'] = 'alert-success';
          options['alertMessage'] = 'Successfully Logged Out';
          showAlert(options);
        }
      });
    } else {
      options['alertClass'] = 'alert-warning';
      options['alertMessage'] = 'You are already signed out!';
      showAlert(options);
    }
  },

});
Bitter.users = new Bitter.Collections.Users();