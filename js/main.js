var canvas = document.getElementById("workshop");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var radius = 10
var drawing = false;

context.lineWidth = radius * 2;

draw = function(e){
	if(drawing){
		context.lineTo(e.offsetX,e.offsetY);
		context.stroke();
		context.beginPath();
		context.arc(e.offsetX,e.offsetY,radius,0,Math.PI * 2);
		context.fill();
		context.beginPath();
		context.moveTo(e.offsetX,e.offsetY);
	}
}

startDraw = function(e){
	drawing = true;
	draw(e)
	console.log(drawing);
}
endDraw = function(){
	drawing = false;
	context.beginPath();
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mousemove", draw);