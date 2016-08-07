/*
*
* Coded with love for Omi ♥, by Alberto Di Biase
*
----------------------------------------------------------
All features will be crated as a separete object in lib.js
and in this script will go all the control structures.
*/

/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

//---Objects---

//UI values elements

var Values = function() {
	this.url = 'img.jpg';
	this.loadImage = function(){ newURL = true;};
	this.size = 4;
	this.colm = 100;
	this.rows = 100;
	this.width = 2;
	this.color = '#000000';
	this.grid = false;
	this.aplFilter = false;
};

// Grid Object

function Grid(colm, rows, size, width) {
	this.colm = colm;
	this.rows = rows;
	this.size = size;
	this.width = width;
	this.color = "#000000";

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
	ctx.lineWidth = this.width;
	ctx.strokeStyle = this.color;
	ctx.stroke();
};

// Image Object

var Image_Can = {
	url: Values.url,
	image: new Image(),
	height: 100,
	width: 100,

	dispImage: function() {
		can.width = this.width;
		can.height = this.height;
		ctx.drawImage(this.image, 0, 0, can.width, can.height);
	},

	setImage: function() {
		console.log(this.image);
		this.height = this.image.height;
		this.width = this.image.width;
		this.dispImage();
	},
	
	getData: function(url) {
		if (newURL) {
			this.url = url;
			
			$.getImageData({
				url: this.url,
				server: 'http://maxnov.com/getimagedata/getImageData.php',
				success: function (image) {
					Image_Can.image = image;
					Image_Can.setImage();
				},

				error: function(xhr, text_status){
					Image_Can.image.src = url;
					Image_Can.setImage();
				}
			});
			newURL = false;
		}
	},

	getImage: function() {
		return (this.image);
	},

};

//---App code---

//Global instances
var g, filter;
var ctx;
var can;
var newURL = false;

window.onload = function() {
	
	can = document.getElementById('can');
	can.width = 500;
	can.height = 500;
	ctx = can.getContext('2d');
	//get the canvas

	// Starting objects
	g = new Grid(Values.colm, Values.rows, Values.size);
	setImage();
	dispImage();	
	animate();


/*/ UI stuff /*/
var UI = new Values();
var gui = new dat.GUI();
var guiURL = gui.add(UI, 'url');
var guiLoadImage = gui.add(UI, 'loadImage');
var gridFolder = gui.addFolder('Grid');
var guiGrid = gridFolder.add(UI, 'grid');
gridFolder.add(UI, 'size', 0, 10).step(1);
gridFolder.add(UI, 'colm').step(1); 
gridFolder.add(UI, 'rows').step(1);
gridFolder.add(UI, 'width', 0, 10).step(0.1);
gridFolder.add(UI, 'color');
gridFolder.open();
var filterFolder = gui.addFolder('Filter');
var guiFilter = filterFolder.add(UI, 'aplFilter');
filterFolder.open();

guiGrid.onFinishChange(function(value){
	dispImage();
});
guiFilter.onFinishChange(function(value){
	setFilter();
});

//End UI

};

function dispImage() {
	Image_Can.dispImage();
}

function setImage() {
	var url = Values.url;
	Image_Can.getData(url);
	var aspc = (Image_Can.height) / (Image_Can.width);
	can.height = window.innerHeight - 15;
	can.width = (window.innerHeight - 15) / aspc;
	Image_Can.dispImage();
}

function setFilter() {
	var filtered = Image_Can.getImage();
	console.log(filtered);
	Filters.greyscale(filtered);
	Image_Can.setImage(filtered);
}

function loadGrid() {
	g.size = Values.size;
	g.colm = Values.colm;
	g.rows = Values.rows;
	g.width = Values.width;
	g.color = Values.color;
	Image_Can.dispImage();
	g.dispGrid();
}

function init() {
	dispImage();
	if (Values.grid) loadGrid();
	if (Values.aplfilter) setFilter();
}

function animate() {
	if (newURL) setImage();
	if (Values.grid) loadGrid();
	if (Values.aplfilter) setFilter();
	requestAnimationFrame(animate);
}