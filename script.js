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
/*/---My code -- /*/

function loadImage() {
	var url = UI.url;
	var img = new Image_Can(url);
	var aspc = (img.height) / (img.width);
	can.height = window.innerHeight - 100;
	can.width = (window.innerHeight - 100) / aspc;
	img.dispImage(ctx);
	console.log(window.innerWidth, window.innerHeight, img.width, img.height, can.width, can.height);
}

function loadGrid() {
	var size = UI.size;
	var colms = UI.colms;
	var rows = UI.rows;
	var g = new Grid(colms, rows, size);
	g.dispGrid();
}

function saveImage(){
	var file = can.toDataURL("image/png", "");
	var a = document.getElementById("link");
	console.log(file);
	a.herf(file);
}

var UI = new function() {
	this.url = 'http://www.balloon-juice.com/wp-content/uploads/2011/09/Starry_Night_Over_the_Rhone-1024x682.jpg';
	this.size = 10;
	this.colms = 10;
	this.rows = 10;
	this.grid = false;
}

function init() {
	console.log("hi");
	loadImage();
	if (UI.grid) loadGrid();
}

window.onload = function() {
	var gui = new dat.GUI();  
	var guiURL = gui.add(UI, 'url');  
	gui.add(UI, 'size');  
	gui.add(UI, 'colms');  
	gui.add(UI, 'rows');
	gui.add(UI, 'grid');
	
	guiURL.onFinishChange(function(value){
		loadImage();
	});

	animate();
};

function animate() {
	requestAnimationFrame( animate );
	init();
}

var cont = document.getElementById('canvas');
var can = document.getElementById('can');
can.width = 500;
can.height = 500;
var ctx = can.getContext('2d');