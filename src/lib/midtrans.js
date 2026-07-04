import midtransClient from "midtrans-client";

// Konfigurasi Snap Client (Untuk generate Token Snap)
export const snap = new midtransClient.Snap({
  isProduction: false, // Ubah ke true saat akan rilis (production)
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
});

// Konfigurasi Core API (Untuk pengecekan status manual)
export const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
});
