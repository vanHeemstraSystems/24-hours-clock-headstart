var spinner = document.querySelector("#spinner");
var items = spinner.childNodes;
var angle = 0;
var img = new Image;

const clocks = [
    {"day": "Sunday", "start": -2.1,"activities": [{"name": "Sleep", "minutes": 83, "color": "darkblue"}, {"name": "bbb", "minutes": 120, "color": "olive"}]},
    {"day": "Monday", "start": -2.1, "activities": [{"name": "Sleep", "minutes": 83, "color": "darkblue"}, {"name": "bbb", "minutes": 120, "color": "purple"}]},
    {"day": "Tuesday", "start": -2.1, "activities": [{"name": "Sleep", "minutes": 83, "color": "darkblue"}, {"name": "bbb", "minutes": 120, "color": "blue"}]},
    {"day": "Wednesday", "start": -2.1, "activities": [{"name": "Sleep", "minutes": 83, "color": "darkblue"}, {"name": "bbb", "minutes": 120, "color": "red"}]},
    {"day": "Thursday", "start": -2.1, "activities": [{"name": "Sleep", "minutes": 83, "color": "darkblue"}, {"name": "bbb", "minutes": 120, "color": "pink"}]},
    {"day": "Friday", "start": -2.1, "activities": [{"name": "Sleep", "minutes": 83, "color": "darkblue"}, {"name": "bbb", "minutes": 120, "color": "yellow"}]},
    {"day": "Saturday", "start": -2.1, "activities": [{"name": "Sleep", "minutes": 83, "color": "darkblue"}, {"name": "bbb", "minutes": 140, "color": "green"}]}
  ];

var totalSpinnerItems = clocks.length;

img.onload = function(){
  console.log('inside img.onload');
  for (var i=0;i<totalSpinnerItems;++i){  
	console.log('inside for loop');
	const number = i + 1;
	console.log('number: ', number);
    // Find the nth div, or create it
	var div = items[i] || spinner.appendChild(document.createElement('div'));
	console.log('div: ', div);
    // Find the nth canvas, or create it
    var canvas = div.getElementsByTagName('canvas')[0] ||
                 div.appendChild(document.createElement('canvas'));
	canvas.width  = 1; // Erase the canvas, in case it existed
    canvas.width  = 300; // Set the width and height as desired
    canvas.height = 300;			 
	canvas.id = "spinnerItem-"+ number;
	canvas.className = "spinnerItem";
	var ctx = canvas.getContext('2d');
	
	// Added
	var radius = canvas.height / 2;
	const clock = clocks[i]
	drawClock(ctx, radius, canvas, clock);
	
    // Use your actual calculations for the SVG size/position here
    ctx.drawImage(img, 0, 0);
  }
}	

// Be sure to set your image source after your load handler is in place
img.src = "blank.svg";

function drawClock(ctx, radius, canvas, clock) {
	console.log('drawClock called');
	drawFace(ctx, radius, canvas);
	const start = clock.start;
	const slices = clock.activities;
	drawSlices(ctx, radius, start, slices);    	
}

function drawFace(ctx, radius, canvas) {
	console.log('drawFace called');
    var grad;	
    //draw white circle for the face
    ctx.beginPath();
	console.log('canvas.width: ', canvas.width);
	console.log('canvas.height: ', canvas.height);
    ctx.arc(canvas.width/2, canvas.height/2, radius*0.95, 0, 2*Math.PI);	
    ctx.fillStyle = "White";
    ctx.fill();
    // create a radial gradient (inner, middle, and outer edge of clock)
    grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, radius*0.90, canvas.width/2, canvas.height/2, radius*1.0);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    //define gradient as stroke style
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke(); 	
    //draw the center of the clock
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawSlices() {
	console.log('drawSlices called');	
	// more ...
}

function galleryspin(sign) { 
  spinner = document.querySelector("#spinner");
  if (!sign) { angle = angle + 45; } else { angle = angle - 45; }
  spinner.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform: rotateY("+ angle +"deg); transform: rotateY("+ angle +"deg);");
}
