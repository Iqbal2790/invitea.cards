import midtransClient from 'midtrans-client';

// Instruksi: Gunakan mode Sandbox (bukan Production)
const isProduction = false;

// Instance Snap API (Untuk men-generate Snap Token dari API Routes Server)
export const snap = new midtransClient.Snap({
  isProduction: isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
});

// Instance Core API (Untuk pengecekan transaksi dan webhook)
export const coreApi = new midtransClient.CoreApi({
  isProduction: isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
});
