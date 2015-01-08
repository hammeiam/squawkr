Bitter.Collections.Users = Backbone.Collection.extend({
	url: '/api/users',
  model: Bitter.Models.User,

  getOrFetch: function(id){
  	var model = this.get(id);
  	var that = this;
  	if(!model){
  		model = new LairBnB.Models.User({ id: id });
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
    var currentUser = this.currentUser();
    var options = {};
    if(!!currentUser){
      $.ajax({
        url: "/session",
        type: "DELETE",
        success: function(resp){
          // debugger
          currentUser.set( { logged_in: false });
          currentUser.fetch();
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