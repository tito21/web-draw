var img = new Image();

function loadImage() {	
	var url = document.getElementById("URL").value;
	img.src = url;
	dImage();
}

function loadGrid() {	
	var size = document.getElementById("size").value;
	colm = can_img.width / size;
	rows = can_img.height / size;
	dGrid(colm, rows);
}

var cont = document.getElementById('canvas');
var can_img = document.getElementById('can_img');
var can_grid = document.getElementById('can_grid');
var ctx_img = can_img.getContext('2d');
var ctx_grid = can_grid.getContext('2d');

function dImage() {
	img.onload = function() {
		can_img.width = img.width;
		can_img.height = img.height;
		can_grid.width = img.width;
		can_grid.height = img.height;
		ctx_img.drawImage(img, 0, 0);
	}
}

function dGrid(colm, rows) {
	ctx_grid.beginPath();

	for (var x = 0; x <= can_img.width; x += colm) {
		ctx_grid.moveTo(0.5 + x, 0);
		ctx_grid.lineTo(0.5 + x, can_img.width);
 	}

	for (var y = 0; y <= can_img.height; y += rows) {
   	ctx_grid.moveTo(0, 0.5 + y);
		ctx_grid.lineTo(can_img.height, 0.5 + y);
	}

	ctx_grid.strokeStyle = "black";
	ctx_grid.stroke();
}


document.getElementById("bttn_LI").addEventListener("click", function(){loadImage()});
document.getElementById("bttn_DG").addEventListener("click", function(){loadGrid()});