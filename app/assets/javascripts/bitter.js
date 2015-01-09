window.Bitter = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Bitter.Routers.Posts({
    	$rootEl: $('#page-wrapper')
    })
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Bitter.initialize();
});
