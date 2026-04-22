const dataKey = [
  {
    nama: "Budi",
    user: "budi123",
    pass: "12345",
    aktif: "Aktif",
    expire: "2026-05-01",
    harga: "50K"
  },
  {
    nama: "Andi",
    user: "andi999",
    pass: "99999",
    aktif: "Aktif",
    expire: "2026-06-01",
    harga: "100K"
  }
];

function tampilKey(list){
  const box = document.getElementById("listKey");

  if(!list || list.length === 0){
    box.innerHTML = "<div class='card'>❌ Data kosong</div>";
    return;
  }

  let html = "";

  list.forEach((d, i) => {
    html += `
    <div class="card">
      <p><b>NAMA PEMBELI:</b> ${d.nama ?? "-"}</p>

      <p><b>USER:</b> ${d.user ?? "-"}
        <button onclick="copyText(${i}, 'user')">Salin</button>
      </p>

      <p><b>PASS:</b> ${d.pass ?? "-"}
        <button onclick="copyText(${i}, 'pass')">Salin</button>
      </p>

      <p><b>AKTIF:</b> ${d.aktif ?? "-"}</p>
      <p><b>EXPIRE:</b> ${d.expire ?? "-"}</p>
      <p><b>HARGA:</b> ${d.harga ?? "-"}</p>
    </div>
    `;
  });

  box.innerHTML = html;
}

// COPY (ANTI BUG + FALLBACK)
function copyText(index, type){
  const value = dataKey[index]?.[type];

  if(!value){
    showToast("❌ Data kosong");
    return;
  }

  if(navigator.clipboard){
    navigator.clipboard.writeText(value)
      .then(() => showToast("✔ Tersalin: " + value))
      .catch(() => fallbackCopy(value));
  } else {
    fallbackCopy(value);
  }
}

function fallbackCopy(text){
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);

  showToast("✔ Tersalin: " + text);
}

// TOAST
function showToast(msg){
  let t = document.createElement("div");

  t.innerText = msg;
  t.style.cssText = `
    position:fixed;
    bottom:20px;
    left:50%;
    transform:translateX(-50%);
    background:#00ffcc;
    color:#000;
    padding:10px 15px;
    border-radius:8px;
    font-size:14px;
    z-index:9999;
  `;

  document.body.appendChild(t);
  setTimeout(()=>t.remove(),1500);
}

// SEARCH (ANTI ERROR + SMOOTH)
let timeout;

function cariKey(){
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const input = document.getElementById("search").value.toLowerCase().trim();

    if(!input){
      tampilKey(dataKey);
      return;
    }

    const hasil = dataKey.filter(d =>
      (d.nama ?? "").toLowerCase().includes(input) ||
      (d.user ?? "").toLowerCase().includes(input) ||
      (d.pass ?? "").toLowerCase().includes(input)
    );

    tampilKey(hasil);
  }, 250);
}

// INIT
tampilKey(dataKey);