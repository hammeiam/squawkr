Bitter.Views.Nav = Backbone.View.extend({
	tagName: 'nav',

	template: JST['nav/show'],

	newPostModal: JST['modals/newPost'],

	initialize: function(options){
		if(!!Bitter.users.currentUser()){
			this.posts = Bitter.users.currentUser().posts;
		}
		this.listenTo(this.collection, 'sync add remove change reset', this.render);
		this.bloodhound = this.startBloodhound();
	},

	events: {
		'click #signOutAction':        'signOut',
		'click #deleteAccountAction':  'deleteAccount',
		'show.bs.modal #newPostModal': 'clearFields',
		'keydown #post-body-input':    'textareaControl',
		'submit form#create-new-post': 'createNewPost',
		'typeahead:selected':          'selectSearchOption'
	},
	
	selectSearchOption: function(obj, datum, name){
		Backbone.history.navigate('#u/' + datum.username, {trigger: true})
	},

	signOut: function(){
		Bitter.users.signOut();
	},

	clearFields: function(e){
		$(e.currentTarget).find('input').val('');
		$(e.currentTarget).find('textarea').val('');
		// keydown event resets line count
		$(e.currentTarget).find('textarea').trigger('keydown')
	},

	render: function(){
		var content = this.template({
			currentUser: Bitter.users.currentUser()
		});
		var newPostModal = this.newPostModal();
		this.$el.html(content);
		this.startTA();
		this.$el.append(newPostModal);
		
		return this;
	},

	startBloodhound: function(){
		var bh = new Bloodhound({
		  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name', 'username'),
		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  limit: 10,
		  // remote: '/api/usesrs/%QUERY.json'
		  prefetch: {
		  	url: '/api/users.json'
		  }
		});
		 
		bh.initialize();
		return bh;
	},

	startTA: function(){
		// view.$('#search .typeahead').typeahead(null, {
			var that = this;
		that.$('#search input.typeahead').typeahead(null, {
		  // name: 'my-users',
		  displayKey: 'username',
		  source: that.bloodhound.ttAdapter(),
		  templates: {
		  	empty: ['<div class="tt-empty">',
		  	'<span>There are no users with that name</span>',
		  	'</div>'].join('\n'),
		  	suggestion: function(datum){ 
		  		return ['<div class="typeahead-option" data-username="' + datum.username + '">',
		  		'<span>' + datum.name +'</span>',
		  		'<span class="grey">@' + datum.username +'</span>'].join('\n')
		  	}
		  }
		});
	},

	textareaControl: function(e){
		var text = $('#post-body-input').val();
		var keyChar = e.which;
		var allowedChars = [8, 17, 18, 27, 33, 34, 37, 38, 39, 40, 46, 91];
		// add or remove character to calculate # lines if this character was allowed
		var calcText = ((keyChar === 8) ? text.substr(0, text.length - 1) : text + 'x');
		var linesLength = this.populateCanvas(calcText);
		var $linesRemaining = $('#post-lines-remaining');
		if(linesLength > 14 && allowedChars.indexOf(keyChar) === -1){
			// only allow delete, navigation, and control keys. No more input. 
			$linesRemaining.addClass( 'red' );
			return false;
		} else {
			$linesRemaining.html(linesLength + ' of 14 lines used')
			if(linesLength >= 14){
				$linesRemaining.addClass( 'orange' );
				$linesRemaining.removeClass( 'red' );
			} else {
				$linesRemaining.removeClass( 'orange', 'red' );
			}
		}
		return e;
	},

	createNewPost: function(e){
		e.preventDefault();
		var text = $('#post-body-input').val();
		this.populateCanvas(text);
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
          var postUrl = '#u/' + Bitter.users.currentUser().id + '/posts/' + resp['success'].id
          Backbone.history.navigate(postUrl, { trigger: true })
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

	populateCanvas: function(text){
		var $canvas = $('#canvas');
		var ctx = $canvas.get(0).getContext('2d');
    var fontSize = 14,
    // same as $POSTWIDTH css
      postWidth = 506,
      lines = [],
      currentY = 0,
      newLines = text.split(/\r\n|\r|\n/g);
	  
	  ctx.font = 'normal normal normal ' + fontSize + 'px Helvetica';
	  for (var i = 0; i < newLines.length; i++) {
	  	var line = '',
      	lineTest = '',
      	words = newLines[i].split(' ');

      for (var j = 0; j < words.length; j++) {
		    lineTest = line + words[j] + ' ';
		    
		    // Check total width of line or last word
		    if (ctx.measureText(lineTest).width > postWidth) {
		      // Calculate the new height
		      currentY = lines.length * (fontSize + 4) + fontSize;

		      // Record and reset the current line
		      lines.push({ text: line, height: currentY });
		      line = words[j] + ' ';
		    } else {
		      line = lineTest;
		    }
		  };
		  
		  // Catch last line in-case something is left over
		  if (line.length > 0) {
		    currentY = lines.length * (fontSize + 4) + fontSize;
		    lines.push({ text: line.trim(), height: currentY });
		  };
	  };	  
	  
	  // Visually output text
	  ctx.fillStyle = "white";
	  ctx.fillRect(0, 0, postWidth, 253);
	  for (var i = 0, len = lines.length; i < len; i++) {
	  	ctx.fillStyle = "rgb(41, 47, 51)"
	    ctx.fillText(lines[i].text, 0, lines[i].height);
	  };
	  // $('#post-lines-remaining').html(lines.length + ' of 13 lines used')
	  return lines.length;
	},

	createForm: function(){
		var canvasEl = $('#canvas')[0];
		var dataURL = canvasEl.toDataURL("image/png");
		// Get our file
	  var file = dataURLtoBlob(dataURL);
	  var postBody = $('#post-body-input').val();
	  var postTitle = $('#post-title-input').val();
	  var tagsArr = postBody.match(/[#|@]\w+/g) || [];
	  
	  // Create new form data
	  var postForm = new FormData();
	  // Append our Canvas image file to the form data
	  postForm.append("post[image_data]", file);
	  postForm.append("post[post_title]", postTitle);
	  postForm.append("post[post_body]", postBody);
	  for (var i = 0; i < tagsArr.length; i++) {
	  	postForm.append("post[post_tags][]", tagsArr[i]);
	  };
	  return postForm;
	}, 

	deleteAccount: function(){
		var userResp = window.prompt('Deleting your account will erase all account information, including posts, from this site forever. \nType "DELETE" to continue.', '');
		if(userResp === 'DELETE'){
			Bitter.users.currentUser().destroy({
				success: function(model, resp){
					if(!!resp['success']){
						var options = {
	          	alertClass: 'alert-success',
	          	alertMessage: resp['success']
	          };
	          Backbone.history.navigate('#', { trigger: true })
	          showAlert(options);
					} else {
						resp['errors'].forEach(function(message){
	          	var options = {
	              alertClass: 'alert-warning',
	              alertMessage: message,
	            };
	            showAlert(options);
						});
					};
				}
			});
		} else if(userResp.length > 0) {
			var options = {
        alertClass: 'alert-warning',
        alertMessage: 'Incorrect phrase, please try again.',
      };
      showAlert(options);
		}
	}
});