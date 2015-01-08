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