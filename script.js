// ================= SAFELINKU CONFIG =================
var go_url = 'https://sfl.gl/';
var api = '75a1ae514a36f53d1909cc9f25969eec800bde35';

var shorten_includ = [
  "link.dana.id",
  "sub4unlock.co",
  "www.mediafire.com",
  "safefileku.com", 
  "move2link.co", 
  "link.adsafelink.com", 
  "docs.google.com"
];

// ================= LOAD SCRIPT SAFELINKU =================
(function(){
  const s = document.createElement("script");
  s.src = "https://safelinku.com/js/web-script.js";
  s.defer = true;
  document.head.appendChild(s);
})();