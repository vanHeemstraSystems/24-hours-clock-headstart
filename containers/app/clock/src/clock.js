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
    // drawTime(ctx, radius, canvas);
	setInterval(drawTime, 1000, ctx, radius, canvas); // runs every second
    drawNumbers(ctx, radius, canvas);
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

function drawTime(ctx, radius, canvas) {
	console.log('drawTime called');	
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	//hour
    //calculate angle of hour hand for 24 hours clock
	hour = ((Math.PI * 2) * ((hour * 5 + (minute / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
	hour = hour - 1;
	console.log('hour: ', hour);
	//make hour hand 50% of canvas's radius
    drawHoursHand(ctx, canvas, hour, radius*0.5, radius*0.03);	
    //second
    //calculate angle of second hand for 24 hours clock
    second=((Math.PI * 2) * (second / 60)) - ((Math.PI * 2) / 4);
    //make second hand 90% of canvas's radius
    drawSecondsHand(ctx, canvas, second, radius*0.9, radius*0.02);
}

function drawHoursHand(ctx, canvas, angle, length, width) {
	console.log('drawHoursHand called');
	console.log('length: ', length);
	console.log('angle: ', angle);
    ctx.beginPath();
    ctx.lineWidth = width;
	ctx.strokeStyle = "grey";
    ctx.lineCap = "round";
    ctx.moveTo(canvas.width/2, canvas.height/2);
	ctx.lineTo((canvas.width/2 + Math.cos(angle) * length),      
                    canvas.height/2 + Math.sin(angle) * length);
    ctx.stroke();
}

function drawSecondsHand(ctx, canvas, angle, length, width) {
	console.log('drawSecondHand called');
	console.log('length: ', length);
	console.log('angle: ', angle);
    ctx.beginPath();
    ctx.lineWidth = width;
	ctx.strokeStyle = "grey";
    ctx.lineCap = "round";
    ctx.moveTo(canvas.width/2, canvas.height/2);
	ctx.lineTo((canvas.width/2 + Math.cos(angle) * length),      
                    canvas.height/2 + Math.sin(angle) * length);
    ctx.stroke();
}

function drawNumbers(ctx, radius, canvas) {
  	console.log('drawNumbers called');
    var ang;
    var num;
    ctx.font = radius*0.10 + "px arial"; //set font at 10% of radius
    ctx.textBaseline = "middle"; //set text alignment to middle
    ctx.textAlign = "center"; //set text alignment to center	
	for(num=1; num < 25; num++){ //calculate the print position for each number: 24-hours clock
		ang = num *Math.PI /12;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.80);
        ctx.rotate(-ang);
		ctx.fillStyle = 'grey';
        ctx.fillText(num.toString(), canvas.width/2, canvas.height/2);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.80);
        ctx.rotate(-ang);
    }
}	

function galleryspin(sign) { 
  spinner = document.querySelector("#spinner");
  if (!sign) { angle = angle + 45; } else { angle = angle - 45; }
  spinner.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform: rotateY("+ angle +"deg); transform: rotateY("+ angle +"deg);");
}
