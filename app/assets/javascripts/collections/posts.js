Bitter.Collections.Posts = Backbone.Collection.extend({
  // url is defined in user.js
  initialize: function(options){
    this.user = options != null ? options.user : void 0;
  },

  url: 'api/posts',

  model: Bitter.Models.Post,
  
  getOrFetch: function(id, callback){
  	var model = this.get(id);
  	var that = this;
  	if(!model){
  		model = new Bitter.Models.Post({ id: id });
  		model.fetch({
  			success: function(m, r){ 
          that.add(model);
          if(callback){
            callback(m, r);
          }
        }
  		})
  	} else {
      model.fetch({
        success: function(m, r){
          if(callback){
            callback(m, r);
          }
        }
      });
    }
  	return model;
  }
});