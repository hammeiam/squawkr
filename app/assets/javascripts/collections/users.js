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

});
Bitter.users = new Bitter.Collections.Users();