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

//Global instances
var g, filter;
var ctx;
var can;

window.onload = function() {
	
	can = document.getElementById('can');
	can.width = 500;
	can.height = 500;
	ctx = can.getContext('2d');
	//get the canvas

	// Starting objects
	//img = new Image_Can(UI.url);
	g = new Grid(UI.colm, UI.rows, UI.size);
	setImage();
	dispImage();	
	animate();
};

/*/ UI stuff /*/
	var gui = new dat.GUI();
	var guiURL = gui.add(UI, 'url');
	var gridFolder = gui.addFolder('Grid');
	var guiGrid = gridFolder.add(UI, 'grid');
	gridFolder.add(UI, 'size', 0, 10).step(1);
	gridFolder.add(UI, 'colm').step(1); 
	gridFolder.add(UI, 'rows').step(1);
	gridFolder.open();
	var filterFolder = gui.addFolder('Filter');
	var guiFilter = filterFolder.add(UI, 'aplFilter');
	filterFolder.open();

	guiURL.onFinishChange(function(value){
		setImage();
	});
	guiGrid.onFinishChange(function(value){
		dispImage();
	});
	guiFilter.onFinishChange(function(value){
		setFilter();
	});

	//End UI

function dispImage() {
	Image_Can.dispImage();
}

function setImage() {
	var url = UI.url;
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
	g.size = UI.size;
	g.colm = UI.colm;
	g.rows = UI.rows;
	g.dispGrid();
}

function init() {
	dispImage();
	if (UI.grid) loadGrid();
	if (UI.aplfilter) setFilter();
}

function animate() {
	init();
	requestAnimationFrame(animate);
}