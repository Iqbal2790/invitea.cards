const crypto = require('crypto');
const fs = require('fs');

// Baca .env.local untuk mendapatkan SERVER_KEY
const envContent = fs.readFileSync('.env.local', 'utf8');
let serverKey = '';
envContent.split('\n').forEach(line => {
  if (line.startsWith('MIDTRANS_SERVER_KEY=')) {
    serverKey = line.split('=')[1].trim();
  }
});

let orderId = process.argv[2];
const statusCode = '200';
const grossAmount = '29000.00';

if (!orderId) {
  console.log("Harap masukkan Order ID (contoh: node test-webhook.js 8c9d2-12345)");
  process.exit(1);
}

// Jika user memasukkan UUID murni tanpa -timestamp, kita tambahkan -12345
// agar webhook bisa memotongnya dengan benar.
if (orderId.split('-').length === 5) {
  orderId = `${orderId}-12345`;
}

const rawString = `${orderId}${statusCode}${grossAmount}${serverKey}`;
const signatureKey = crypto.createHash('sha512').update(rawString).digest('hex');

const payload = {
  order_id: orderId,
  transaction_status: "settlement",
  fraud_status: "accept",
  status_code: statusCode,
  gross_amount: grossAmount,
  signature_key: signatureKey
};

fetch('http://localhost:3000/api/midtrans/webhook', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => {
  console.log("Webhook berhasil dipanggil!", data);
})
.catch(err => {
  console.error("Gagal memanggil webhook:", err);
});
