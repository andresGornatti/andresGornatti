window.addEventListener("load",()=>{

// -- Seteando #Home Background por Canvas -- //
	let canvas = document.getElementById("home-bg");
	canvas.style.height="100vh";
	canvas.style.width="100vw";
	canvas.style.maxWidth="100%";

	let ctx = canvas.getContext("2d");
	let img = new Image();
	img.src="img/bg.jpg";
	let particles = [];
	function drawBg() {
		canvas.width = img.width*1;
		canvas.height = img.height*1;
		ctx.drawImage(img,0,0);
	}

	img.onload = drawBg;
			
startup();

var ballX = 0;
var ballY = 0;
var mouseX = 0;
var mouseY = 0;

function startup() {
  document.getElementById("home-bg").onmousemove = mouseMove;
  loop();
}

//use `requestAnimationFrame` for the game loop
//so you stay sync with the browsers rendering
//makes it a smoother animation
function loop(){
  moveBall();
  requestAnimationFrame(loop);
}
function mouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}
function moveBall() {
  //get the distance between the mouse and the ball on both axes
  //walk only the an eight of the distance to create a smooth fadeout
  let dx = (mouseX - ballX) * 10.2;
  let dy = (mouseY - ballY) * 10.2;
  //calculate the distance this would move ...
  let distance = Math.sqrt((dx*(dx*.8)) + (dy*(dy*.8)));
  //... and cap it at 5px
  if(distance > 5.5){
    dx *= 5.5/distance;
    dy *= 5.5/distance;
  }
  //now move
  ballX += (dx*1.15);
  ballY += (dy*1.15);
  
  let canvas = document.getElementById("home-bg");
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(ballX, ballY, 2, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(182,177,233,.2)";
  ctx.fill();
  ctx.lineWidth = .0015;
  ctx.strokeStyle = "rgba(0,0,0,.9)";
  ctx.stroke();
}

});