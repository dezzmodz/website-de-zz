// LOADING
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1500);
});

// PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const scale = window.devicePixelRatio;
canvas.width = window.innerWidth * scale;
canvas.height = window.innerHeight * scale;
ctx.scale(scale, scale);

let particles = [];
let jumlah = window.innerWidth < 500 ? 40 : 90;

for (let i = 0; i < jumlah; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
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

    if (p.y > window.innerHeight) {
      p.y = 0;
      p.x = Math.random() * window.innerWidth;
    }
  });

  requestAnimationFrame(draw);
}

draw();

// ESCAPE HTML
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[m]));
}

// TAMPILKAN MOD
function tampilkanMods() {
  let mods = JSON.parse(localStorage.getItem("mods") || "[]");

  let html = "";

  mods.forEach((m, i) => {
    html += `
    <div class="card" style="animation: fadeUp 0.4s ease ${i * 0.05}s forwards; opacity:0;">
      <a class="download-btn" href="${m.link}" target="_blank" rel="noopener noreferrer nofollow">
        ${escapeHTML(m.judul)}
      </a>
      <p class="desc">${escapeHTML(m.deskripsi || "Tidak ada deskripsi")}</p>
    </div>
    `;
  });

  document.getElementById("modList").innerHTML = html;
}

tampilkanMods();