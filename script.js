/* ===== LOADER ===== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
  }, 1200);
});

/* ===== PARTICLES ===== */
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();

  let particles = [];

  function init() {
    particles = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        d: Math.random() * 1
      });
    }
  }
  init();

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = "#5b6bff";
      ctx.fill();

      p.y += p.d;
      if (p.y > canvas.height) {
        p.y = 0;
      }
    });

    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener("resize", () => {
    resize();
    init();
  });
}

/* ===== ENCRYPT LINK ===== */
document.querySelectorAll(".download-btn").forEach(btn => {
  btn.addEventListener("click", function(e){
    e.preventDefault();

    const enc = this.getAttribute("data-link");
    if (!enc) return;

    const url = atob(enc);

    this.innerText = "⏳ Loading...";

    setTimeout(()=>{
      window.open(url, "_blank");
    }, 1200);
  });
});

/* ===== ANTI INSPECT ===== */
document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) e.preventDefault();
});

/* ===== ANTI DEVTOOLS DETECT ===== */
setInterval(() => {
  if (window.outerWidth - window.innerWidth > 150) {
    document.body.innerHTML = "🚫 BLOCKED";
  }
}, 1000);

/* ===== ANTI IFRAME ===== */
if (window.top !== window.self) {
  document.body.innerHTML = "";
}

/* ===== ANTI BOT ===== */
if (navigator.webdriver) {
  document.body.innerHTML = "Bot detected 🚫";
}