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

if ( !window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame || // comment out if FF4 is slow (it caps framerate at ~30fps: https://bugzilla.mozilla.org/show_bug.cgi?id=630127)
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

			window.setTimeout( callback, 1000 / 60 );

		};

	} )();

}

//Global instances of the fueters
var img, g, filter;
var ctx;
var can;
var UI;

window.onload = function() {
	
	can = document.getElementById('can');
	can.width = 500;
	can.height = 500;
	ctx = can.getContext('2d');
	//get the canvas

	/*/ UI stuff /*/

	var gui = new dat.GUI(); 
	var guiURL = gui.add(UI, 'url');  
	var gridFolder = gui.addFolder('Grid');
	var guiGrid = gridFolder.add(UI, 'grid');
	gridFolder.add(UI, 'size', 0, 30);  
	gridFolder.add(UI, 'colm');  
	gridFolder.add(UI, 'rows');
	gridFolder.open();
	var filterFolder = gui.addFolder('Filter');
	var guiFilter = filterFolder.add(UI, 'aplFilter');

	guiURL.onFinishChange(function(value){
		loadImage();
	});
	guiGrid.onFinishChange(function(value){
		loadGrid();
	});
	guiFilter.onFinishChange(function(value){
		setFilter();
	});
	//End UI

	// Starting objects
	img = new Image_Can(UI.url);
	g = new Grid(UI.colm, UI.rows, UI.size);
	filter = new Filter(img.image);

	animate();
};

function loadImage() {
	var url = UI.url;
	img.setImage(url);
	var aspc = (img.height) / (img.width);
	can.height = window.innerHeight - 100;
	can.width = (window.innerHeight - 100) / aspc;
	img.dispImage();
}

function setFilter() {
	var filtered = filter.calcFilter();
	img.setImage(filtered);
}

function loadGrid() {
	g.size = UI.size;
	g.colm = UI.colm;
	g.rows = UI.rows;
	g.dispGrid();
}

function init() {
	loadImage();
	//img.dispImage();
	if (UI.grid) loadGrid();
}

function animate() {
	requestAnimationFrame( animate );
	init();
}