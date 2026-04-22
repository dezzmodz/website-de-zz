// LOADING
setTimeout(() => {
  document.getElementById("loader").style.opacity = "0";
  setTimeout(()=>{
    document.getElementById("loader").style.display = "none";
  },500);
}, 2500);

/* ===== PARTICLES BACKGROUND (SMOOTHER) ===== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 90; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    d: Math.random() * 1.5 + 0.2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(91,107,255,0.7)";
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.y += p.d;

    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(draw);
}

draw();

/* ===== TAMBAH MOD ===== */
function tambahMod() {
  const judul = document.getElementById("judul");
  const deskripsi = document.getElementById("deskripsi");
  const link = document.getElementById("link");

  if (!judul.value || !link.value) {
    alert("Isi judul & link!");
    return;
  }

  const data = {
    judul: judul.value,
    deskripsi: deskripsi.value,
    link: link.value
  };

  let mods = JSON.parse(localStorage.getItem("mods") || "[]");
  mods.unshift(data); // biar yang baru di atas
  localStorage.setItem("mods", JSON.stringify(mods));

  // reset form
  judul.value = "";
  deskripsi.value = "";
  link.value = "";

  tampilkanMods();
}

/* ===== TAMPILKAN MODS (ANIMATED) ===== */
function tampilkanMods() {
  let mods = JSON.parse(localStorage.getItem("mods") || "[]");

  let html = "";

  mods.forEach((m, i) => {
    html += `
    <div class="card" style="animation: fadeUp 0.4s ease ${i * 0.05}s forwards; opacity:0;">
      <a class="download-btn" href="${m.link}" target="_blank">
        ${m.judul}
      </a>
      <p class="desc">${m.deskripsi || "Tidak ada deskripsi"}</p>
    </div>
    `;
  });

  document.getElementById("modList").innerHTML = html;
}

tampilkanMods();

/* ===== RESPONSIVE CANVAS ===== */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});