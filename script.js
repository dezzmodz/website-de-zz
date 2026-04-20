// LOADING
setTimeout(()=>{
 document.getElementById("loader").style.display="none";
},3500);

/* ===== PARTICLES BACKGROUND ===== */
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

for(let i=0;i<70;i++){
 particles.push({
   x:Math.random()*canvas.width,
   y:Math.random()*canvas.height,
   r:Math.random()*2,
   d:Math.random()*1
 });
}

function draw(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle="#5b6bff";

 particles.forEach(p=>{
   ctx.beginPath();
   ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
   ctx.fill();

   p.y+=p.d;
   if(p.y>canvas.height){
     p.y=0;
     p.x=Math.random()*canvas.width;
   }
 });

 requestAnimationFrame(draw);
}

draw();
function tambahMod(){

  const judul = document.getElementById("judul").value;
  const deskripsi = document.getElementById("deskripsi").value;
  const link = document.getElementById("link").value;

  if(!judul || !link){
    alert("Isi judul & link!");
    return;
  }

  const data = {
    judul,
    deskripsi,
    link
  };

  let mods = JSON.parse(localStorage.getItem("mods") || "[]");
  mods.push(data);
  localStorage.setItem("mods", JSON.stringify(mods));

  tampilkanMods();
}

// tampilkan saat load
function tampilkanMods(){
  let mods = JSON.parse(localStorage.getItem("mods") || "[]");

  let html = "";

  mods.forEach(m => {
    html += `
    <div class="card">
      <a class="download-btn" href="${m.link}" target="_blank">
        ${m.judul}
      </a>
      <p class="desc">${m.deskripsi}</p>
    </div>
    `;
  });

  document.getElementById("modList").innerHTML = html;
}

tampilkanMods();