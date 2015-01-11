Bitter.Views.Nav = Backbone.View.extend({
	tagName: 'nav',
	// className: 'navbar navbar-default',
	template: JST['nav/show'],
	newPostModal: JST['modals/newPost'],
	initialize: function(options){
		// address excessive rendering of nav
		if(!!Bitter.users.currentUser()){
			this.posts = Bitter.users.currentUser().posts;
		}
		this.listenTo(this.collection, 'sync add remove change reset', this.render);
	},

	events: {
		'click #signOutAction': 'signOut',
		// 'click #newPostAction': 'signOut',
		'submit form#create-new-post': 'createNewPost'
	},

	signOut: function(){
		Bitter.users.signOut();
	},

	render: function(){
		var content = this.template({
			currentUser: Bitter.users.currentUser()
		});
		var newPostModal = this.newPostModal();
		this.$el.html(content);
		this.$el.append(newPostModal);
		this.$('#post-body-input').autosize();
  	// this.focusModals();
		return this;
	},

	createNewPost: function(e){
		e.preventDefault();
		this.populateCanvas();
		var postForm = this.createForm();
	  var posts = this.posts;

	  $.ajax({
	     url: "/api/users/" + Bitter.users.currentUser().get('username') + "/posts",
	     type: "POST", 
	     data: postForm,
	     processData: false,
	     contentType: false,
	     success: function(resp){
	     	if(!!resp['success']){
          $('#newPostModal').modal('hide');
          // addresses a bug with some browsers & bootstrap
          $('body').removeClass('modal-open');
          var options = {
          	alertClass: 'alert-success',
          	alertMessage: 'Post Created!'
          };
          showAlert(options);
          posts.fetch();
        } else {
          resp['errors'].forEach(function(message){
          	var options = {
              alertClass: 'alert-warning',
              alertMessage: message,
              alertLocation: '#new-post-alerts-container-modal'
            };
            showAlert(options);
          });
        }
	     }
	  });
	},

	populateCanvas: function(){
		var canvas = $('#canvas');
		var ctx = canvas.get(0).getContext('2d');
	  var text = $('#post-body-input').val(),
      fontSize = 14,
      width = 440,
      lines = [],
      line = '',
      lineTest = '',
      words = text.split(' '),
      currentY = 0;
	  
	  ctx.font = fontSize + 'px Helvetica';
	  
	  for (var i = 0, len = words.length; i < len; i++) {
	    lineTest = line + words[i] + ' ';
	    
	    // Check total width of line or last word
	    if (ctx.measureText(lineTest).width > width) {
	      // Calculate the new height
	      currentY = lines.length * (fontSize + 4) + fontSize;

	      // Record and reset the current line
	      lines.push({ text: line, height: currentY });
	      line = words[i] + ' ';
	    } else {
	      line = lineTest;
	    }
	  };
	  
	  // Catch last line in-case something is left over
	  if (line.length > 0) {
	    currentY = lines.length * (fontSize + 4) + fontSize;
	    lines.push({ text: line.trim(), height: currentY });
	  };
	  
	  // Visually output text
	  ctx.fillStyle = "white";
	  ctx.fillRect(0, 0, 440, 220);
	  for (var i = 0, len = lines.length; i < len; i++) {
	  	ctx.fillStyle = "rgb(41, 47, 51);"
	    ctx.fillText(lines[i].text, 0, lines[i].height);
	  };
	},

	createForm: function(){
		var canvasEl = $('#canvas')[0];
		var dataURL = canvasEl.toDataURL("image/png");
		// Get our file
	  var file = dataURLtoBlob(dataURL);
	  var postBody = $('#post-body-input').val();
	  var postTitle = $('#post-title-input').val();
	  var hashtagsArr = postBody.match(/#\w+/g) || [];
	  if(hashtagsArr.length > 0){
	  	var hashtags = hashtagsArr.join(' ');
	  } else {
	  	var hashtags = '';
	  }
	  
	  // Create new form data
	  var postForm = new FormData();
	  // Append our Canvas image file to the form data
	  postForm.append("post[image_data]", file);
	  postForm.append("post[post_title]", postTitle);
	  postForm.append("post[post_body]", postBody);
	  postForm.append("post[post_hashtags]", hashtags);
	  return postForm;
	}, 

	processString: function(string){
		
	}

});