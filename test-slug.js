const crypto = require('crypto');

const dataContent = {
  "email": "iqbal.muhammad1040@gmail.com",
  "momen": "Ulang tahun",
  "pesan_ucapan": "selamat ulang tahun",
  "nama_penerima": "Gatau Siapa",
  "nama_pengirim": "Iqbal"
};
const orderData = {
  templates: { kategori: 'Kartu Ucapan' },
  data_content: dataContent
};

const isUcapan = (orderData.templates?.category || orderData.templates?.kategori)?.toLowerCase().includes("ucapan");
          
let baseSlug = "";
if (isUcapan) {
  const penerima = dataContent.nama_penerima || "penerima";
  baseSlug = `untuk-${penerima.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
} else {
  const pria = dataContent.nama_pria || "pria";
  const wanita = dataContent.nama_wanita || "wanita";
  baseSlug = `${pria.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${wanita.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

baseSlug = baseSlug.replace(/-+$/, '');
console.log(baseSlug);
