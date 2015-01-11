Bitter.Collections.Posts = Backbone.Collection.extend({
  // url is defined in user.js
  initialize: function(options){
    this.user = options.user;
  },

  model: Bitter.Models.Post,
  
  getOrFetch: function(id){
  	var model = this.get(id);
  	var that = this;
  	if(!model){
  		model = new Bitter.Models.Post({ id: id });
  		model.fetch({
  			success: function(){ that.add(model) }
  		})
  	} else {
      model.fetch();
    }
  	return model;
  }
});