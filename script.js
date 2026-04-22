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
  list.forEach((d, i) => {
    output += `
    <div class="card">
      <p>NAMA PEMBELI : ${d.nama}</p>
      <p>USER : ${d.user} 
        <button onclick="copyText('${d.user}')">Salin</button>
      </p>
      <p>PASS : ${d.pass} 
        <button onclick="copyText('${d.pass}')">Salin</button>
      </p>
      <p>AKTIF : ${d.aktif}</p>
      <p>EXPIRE : ${d.expire}</p>
      <p>HARGA : ${d.harga}</p>
    </div>
    `;
  });
  document.getElementById("listKey").innerHTML = output;
}

function copyText(text){
  navigator.clipboard.writeText(text);
  alert("Berhasil disalin: " + text);
}

function cariKey(){
  let input = document.getElementById("search").value.toLowerCase();
  let hasil = dataKey.filter(d =>
    d.nama.toLowerCase().includes(input) ||
    d.user.toLowerCase().includes(input)
  );
  tampilKey(hasil);
}

// tampil awal
tampilKey(dataKey);