/* ================= LOADING ================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1500);
});


/* ================= PARTICLES ================= */
const canvas = document.getElementById("particles");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    const scale = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
  }

  resizeCanvas();

  let particles = [];
  let jumlah = window.innerWidth < 500 ? 40 : 90;

  function initParticles() {
    particles = [];
    for (let i = 0; i < jumlah; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2 + 0.5,
        d: Math.random() * 1.5 + 0.2
      });
    }
  }

  initParticles();

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

  window.addEventListener("resize", () => {
    resizeCanvas();
    jumlah = window.innerWidth < 500 ? 40 : 90;
    initParticles();
  });
}


/* ================= SECURITY (ANTI XSS) ================= */
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[m]));
}


/* ================= TAMPILKAN MOD ================= */
function tampilkanMods() {
  const container = document.getElementById("modList");
  if (!container) return;

  let mods = [];

  try {
    mods = JSON.parse(localStorage.getItem("mods") || "[]");
  } catch {
    mods = [];
  }

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

  container.innerHTML = html;
}


/* ================= TAMBAH MOD ================= */
function tambahMod() {
  const judul = document.getElementById("judul");
  const deskripsi = document.getElementById("deskripsi");
  const link = document.getElementById("link");

  if (!judul || !link) return;

  if (!judul.value.trim() || !link.value.trim()) {
    alert("Isi judul & link!");
    return;
  }

  const data = {
    judul: judul.value.trim(),
    deskripsi: deskripsi.value.trim(),
    link: link.value.trim()
  };

  let mods = [];

  try {
    mods = JSON.parse(localStorage.getItem("mods") || "[]");
  } catch {
    mods = [];
  }

  mods.unshift(data);
  localStorage.setItem("mods", JSON.stringify(mods));

  // reset form
  judul.value = "";
  deskripsi.value = "";
  link.value = "";

  tampilkanMods();
}


/* ================= INIT ================= */
tampilkanMods();