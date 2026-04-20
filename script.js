// LOADING
setTimeout(()=>{
 document.getElementById("loader").style.display="none";
},3000);

// PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<50;i++){
 particles.push({
   x:Math.random()*canvas.width,
   y:Math.random()*canvas.height,
   r:Math.random()*2,
   d:Math.random()*1
 });
}

function draw(){
 ctx.clearRect(0,0,canvas.width,canvas.height);

 particles.forEach(p=>{
   ctx.beginPath();
   ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
   ctx.fill();

   p.y+=p.d;
   if(p.y>canvas.height){
     p.y=0;
   }
 });

 requestAnimationFrame(draw);
}

draw();