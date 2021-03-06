var spinner = document.querySelector("#spinner");
var items = spinner.childNodes;
var angle = 0;
var img = new Image;

const clocks = [
    {"day": "Sunday", "start": -2.1,"activities": [{"name": "Sleep", "minutes": 540, "color": "darkblue"}, {"name": "Shower", "minutes": 15, "color": "cyan"}, {"name": "Breakfast", "minutes": 15, "color": "yellow"}, {"name": "Dress", "minutes": 15, "color": "olive"}, {"name": "Face Treatment", "minutes": 15, "color": "yellow"}]},
    {"day": "Monday", "start": -2.1, "activities": [{"name": "Sleep", "minutes": 540, "color": "darkblue"}, {"name": "Shower", "minutes": 15, "color": "cyan"}, {"name": "Breakfast", "minutes": 15, "color": "yellow"}, {"name": "Dress", "minutes": 15, "color": "olive"}, {"name": "Face Treatment", "minutes": 15, "color": "yellow"}]},
    {"day": "Tuesday", "start": -2.1, "activities": [{"name": "Sleep", "minutes": 540, "color": "darkblue"}, {"name": "Shower", "minutes": 15, "color": "cyan"}, {"name": "Breakfast", "minutes": 15, "color": "yellow"}, {"name": "Dress", "minutes": 15, "color": "olive"}, {"name": "Face Treatment", "minutes": 15, "color": "yellow"}]},
    {"day": "Wednesday", "start": -2.1, "activities": [{"name": "Sleep", "minutes": 540, "color": "darkblue"}, {"name": "Shower", "minutes": 15, "color": "cyan"}, {"name": "Breakfast", "minutes": 15, "color": "yellow"}, {"name": "Dress", "minutes": 15, "color": "olive"}, {"name": "Face Treatment", "minutes": 15, "color": "yellow"}]},
    {"day": "Thursday", "start": -2.1, "activities": [{"name": "Sleep", "minutes": 540, "color": "darkblue"}, {"name": "Shower", "minutes": 15, "color": "cyan"}, {"name": "Breakfast", "minutes": 15, "color": "yellow"}, {"name": "Dress", "minutes": 15, "color": "olive"}, {"name": "Face Treatment", "minutes": 15, "color": "yellow"}]},
    {"day": "Friday", "start": -2.1, "activities": [{"name": "Sleep", "minutes": 540, "color": "darkblue"}, {"name": "Shower", "minutes": 15, "color": "cyan"}, {"name": "Breakfast", "minutes": 15, "color": "yellow"}, {"name": "Dress", "minutes": 15, "color": "olive"}, {"name": "Face Treatment", "minutes": 15, "color": "yellow"}]},
    {"day": "Saturday", "start": -2.1, "activities": [{"name": "Sleep", "minutes": 540, "color": "darkblue"}, {"name": "Shower", "minutes": 15, "color": "cyan"}, {"name": "Breakfast", "minutes": 15, "color": "yellow"}, {"name": "Dress", "minutes": 15, "color": "olive"}, {"name": "Face Treatment", "minutes": 15, "color": "yellow"}]}
  ];

var totalSpinnerItems = clocks.length;

img.onload = function(){ 
  document.body.addEventListener("keydown", function(event) {
	// 37 = 'left arrow' key
    if (event.keyCode === 37) {
        event.preventDefault();
		galleryspin('-');
    }	
	// 39 = 'right arrow' key
    if (event.keyCode === 39) {
        event.preventDefault();
		galleryspin('');
    }	
  });  
  
  for (var i=0;i<totalSpinnerItems;++i){  
	const number = i + 1;
    // Find the nth div, or create it
	var div = items[i] || spinner.appendChild(document.createElement('div'));
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
	// use layers to optimize rendering
	var canvasStack = new CanvasStack(canvas.id);
	// last layer created will be on top of all previously created layers
	// Back layer
	var layerBack = canvasStack.createLayer();
	var ctxBack = document.getElementById(layerBack).getContext('2d');
	drawBack(ctxBack, radius, canvas);
	// Slices
	const start = clock.start;
	const slices = clock.activities;
	var layerSlices = canvasStack.createLayer();
	var ctxSlices = document.getElementById(layerSlices).getContext('2d');
	drawSlices(ctxSlices, radius, canvas, start, slices);
	// Time
	var layerTime = canvasStack.createLayer();
	var ctxTime = document.getElementById(layerTime).getContext('2d');
	setInterval(drawTime, 1000, ctxTime, radius, canvas); // runs every second
	// Numbers
	var layerNumbers = canvasStack.createLayer();
	var ctxNumbers = document.getElementById(layerNumbers).getContext('2d');
	drawNumbers(ctxNumbers, radius, canvas);
	// Face layer
	const day = clock.day;
	var layerFace = canvasStack.createLayer();
	var ctxFace = document.getElementById(layerFace).getContext('2d');
	drawFace(ctxFace, radius, canvas, day);
}

function drawBack(ctx, radius, canvas) {
    var grad;	
    //draw grey circle for the back
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, radius*0.95, 0, 2*Math.PI);	
    ctx.fillStyle = "Grey";
	ctx.backColor = "Grey";
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
}

function drawFace(ctx, radius, canvas, day) {
    var grad;
    //leave the circle for the face empty
	//arc is required
    ctx.arc(canvas.width/2, canvas.height/2, radius*0.95, 0, 2*Math.PI);	
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
	//draw the text on the center of the clock
    ctx.beginPath();
	ctx.font = "10px arial";
    var textString = day,
    textWidth = (ctx.measureText(textString).width)+4; //margin of 2	
	textHeight = (ctx.measureText(textString).height)+4; //margin of 2
	ctx.fillStyle = '#333'; //for background
	ctx.fillRect((canvas.width/2)-(textWidth/2),(canvas.height/2)-6, textWidth, parseInt(10, 10)+2);
	ctx.fillStyle = 'White'; //for text
	ctx.fillText(textString, (canvas.width/2)-(textWidth/2)+2, (canvas.height/2)+2);
    ctx.fill();	
}

function drawSlices(ctx, radius, canvas, start, slices) {	
    var totalValue = 0;
    for (let i = 0; i < slices.length; i++) {
        const slice = slices[i];
		const value = slice.minutes;
		totalValue += value;
    }
	var startAngle = start;
    for (let i = 0; i < slices.length; i++) {
		const slice = slices[i];
		const value = (225/540) * slice.minutes; //eye-balling it :)
		const sliceAngle = 2 * Math.PI * value / totalValue;
		drawSlice(ctx, radius, canvas, startAngle, sliceAngle, slice);
		startAngle += sliceAngle;
	}
}

function drawSlice(ctx, radius, canvas, startAngle, sliceAngle, slice) {
	ctx.fillStyle = slice.color;
	ctx.beginPath();
	ctx.moveTo(canvas.width / 2, canvas.height / 2);
	const endAngle = startAngle+sliceAngle;
	ctx.arc(canvas.width / 2, canvas.height / 2, radius, startAngle, endAngle);
	ctx.closePath();
	ctx.fill();
}	

function drawTime(ctx, radius, canvas) {
	var now = new Date();	
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	//hour
    //calculate angle of hour hand for 24 hours clock
	if(hour>12) {
	  hour = ((Math.PI * 2) * ((hour * 5 + (minute / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
	  hour = hour - 10.6; //eye-balling it :)
	} else {
	  hour = ((Math.PI * 2) * ((hour * 5 + (minute / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
	  hour = hour - 1; //eye-balling it :)
	}
	//make hour hand 50% of canvas's radius
    drawHoursHand(ctx, canvas, hour, radius*0.5, radius*0.03);	
    //second
    //calculate angle of second hand for 24 hours clock
    second=((Math.PI * 2) * (second / 60)) - ((Math.PI * 2) / 4);
    //make second hand 90% of canvas's radius
    drawSecondsHand(ctx, canvas, second, radius*0.9, radius*0.02);
}

function drawHoursHand(ctx, canvas, angle, length, width) {
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
    ctx.beginPath();
    ctx.lineWidth = width;
	ctx.strokeStyle = "grey";
    ctx.lineCap = "round";
    ctx.moveTo(canvas.width/2, canvas.height/2);
	ctx.lineTo((canvas.width/2 + Math.cos(angle) * length),      
                    canvas.height/2 + Math.sin(angle) * length);
    ctx.stroke();
	//after less than a second, clear this layer
	setTimeout(function() { ctx.clearRect(0,0,canvas.width,canvas.height); }, 900);
}

function drawNumbers(ctx, radius, canvas) {
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
