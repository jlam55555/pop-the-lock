$(function() {
	var spinner = $("div#spinner");
	var target = $("div#target");
	var middle = $("div#middle");
	var score = 0;
	var targetAngle = 0;
	var setTargetAngle = function(oldAngle) {
		do {
			targetAngle = Math.floor(Math.random() * 360);
		} while(Math.abs(targetAngle - oldAngle) < 30);
		if(targetAngle > 180)
			targetAngle -= 360;
		target.css("transform", "rotate(" + targetAngle + "deg)");
	};
	setTargetAngle(0);
	var getAngle = function(transform) {
		// get rotation angle
		// thanks CSSTricks: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
		var values = transform.split('(')[1],
		    values = values.split(')')[0],
			values = values.split(',');
		var a = values[0];
		var b = values[1];
		var c = values[2];
		var d = values[3];
		// angle is between -180 (bottom) and 180 (bottom), going clockwise
		return angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
	};
	$(document).keydown(function() {
		if(event.which != 32)
			return;
		var currentAngle = getAngle(spinner.css("transform"));
		if(currentAngle < targetAngle + 10 && currentAngle > targetAngle - 10) {
			setTargetAngle(targetAngle);
			middle.text(++score);
			spinner.toggleClass("reverse");
		} else {
			score = 0;
			middle.text(0);
			target.addClass("missed");
			setTimeout(function() { target.removeClass("missed"); }, 200);
		}
	});
});
