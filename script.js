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
  let output = "";

  list.forEach((d) => {
    output += `
    <div class="card">
      <p><b>NAMA PEMBELI:</b> ${d.nama || "-"}</p>

      <p><b>USER:</b> ${d.user || "-"} 
        <button onclick="copyText('${d.user || ''}')">Salin</button>
      </p>

      <p><b>PASS:</b> ${d.pass || ""} 
        <button onclick="copyText('${d.pass || ''}')">Salin</button>
      </p>

      <p><b>AKTIF:</b> ${d.aktif || "-"}</p>
      <p><b>EXPIRE:</b> ${d.expire || "-"}</p>
      <p><b>HARGA:</b> ${d.harga || "-"}</p>
    </div>
    `;
  });

  document.getElementById("listKey").innerHTML = output || "<div class='card'>❌ Data kosong</div>";
}

function copyText(text){
  if(!text) return;

  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  showToast("✔ Tersalin: " + text);
}

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

let timeout;

function cariKey(){
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    let input = document.getElementById("search").value.toLowerCase().trim();

    if(!input){
      tampilKey(dataKey);
      return;
    }

    let hasil = dataKey.filter(d =>
      (d.nama && d.nama.toLowerCase().includes(input)) ||
      (d.user && d.user.toLowerCase().includes(input)) ||
      (d.pass && d.pass.toLowerCase().includes(input))
    );

    tampilKey(hasil);
  }, 300);
}

// tampil awal
tampilKey(dataKey);