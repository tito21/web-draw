//UI elements

function UI() {
	this.url = 'http://www.balloon-juice.com/wp-content/uploads/2011/09/Starry_Night_Over_the_Rhone-1024x682.jpg';
	this.size = 4;
	this.colm = 10;
	this.rows = 10;
	this.grid = false;
	this.aplFilter = false;
}

// Grid Object

function Grid(colm, rows, size) {
	this.colm = colm;
	this.rows = rows;
	this.size = size;

	if (this.size > 0) {
		this.rows = can.height / this.size;
		this.colm = can.width / this.size;
	}

}

Grid.prototype.dispGrid = function() {
	ctx.beginPath();

	if (this.size > 0) {
		this.rows = can.height / this.size;
		this.colm = can.width / this.size;
	}

	for (var x = 0; x <= can.width; x += this.colm) {

		ctx.moveTo(0.5 + x, 0.5);
		ctx.lineTo(0.5 + x, can.height);
	}

	for (var y = 0; y <= can.height; y += this.rows) {
		ctx.moveTo(0.5, 0.5 + y);
		ctx.lineTo(can.width, 0.5 + y);
	}
	ctx.strokeStyle = "black";
	ctx.stroke();
};

// Image Object

function Image_Can (url) {
	this.url = url;
	this.image = new Image();
	this.setImage();
	this.height = this.image.height;
	this.width = this.image.width;
}

Image_Can.prototype.dispImage = function() {
	ctx.drawImage(this.image, 0, 0, can.width, can.height);
};

Image_Can.prototype.setImage = function(url) {
	this.url =url;
	$.getImageData({
		url: this.url,
		server: 'http://maxnov.com/getimagedata/getImageData.php',
		success: function (image) {
		ctx.drawImage(image, 0, 0, can.width, can.height);
		},

		error: function(xhr, text_status){
 		}
	});
	this.height = this.image.height;
	this.width = this.image.width;
};

Image_Can.prototype.getImage = function() {
	return (this.image);
}