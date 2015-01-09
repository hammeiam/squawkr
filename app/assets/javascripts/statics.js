function showAlert(userOptions){
	// alertClasses are 'alert-success', 'alert-info', 'alert-warning', and 'alert-danger'
	var defaults = {
		alertClass: 'alert-warning',
		alertMessage: 'Something went wrong',
		alertLocation: '#alerts-container'
	};
	var options = jQuery.extend({}, defaults, userOptions);
	var $alertsContainer = $(options['alertLocation']);
	var $content = $("<div class='alert " + options['alertClass'] + 
		"' role='alert' style='display:none;'>" + options['alertMessage'] + "</div>");

	$content.hide().appendTo($alertsContainer).slideDown();
	setTimeout(function() {
	  $content.slideUp(600, function(){
	  	$content.remove();
	  });
	}, 3000);
};

function dataURLtoBlob(dataURL) {
  // Decode the dataURL    
	var binary = atob(dataURL.split(',')[1]);
  // Create 8-bit unsigned array
  var array = [];
  for(var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
  }
  // Return our Blob object
  return new Blob([new Uint8Array(array)], { type: 'image/png' });
}