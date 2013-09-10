function loadImage() {	
	var url = $("#URL").val();
	alert(url);
	var img = new Image();
	img.src = url;
}

$(document).ready(function() {
	var ctx = document.getElementById('canvas').getContext('2d');
	img.onload = function() {
		ctx.drawImage(img, 0, 0);
	}
});