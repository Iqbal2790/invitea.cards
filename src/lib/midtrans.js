import midtransClient from "midtrans-client";

// Auto-detect production mode based on explicit env var, fallback to NODE_ENV
const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true" 
  || (process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === undefined && process.env.NODE_ENV === "production");

// Konfigurasi Snap Client (Untuk generate Token Snap)
export const snap = new midtransClient.Snap({
  isProduction,
  serverKey,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
});

// Konfigurasi Core API (Untuk pengecekan status manual)
export const coreApi = new midtransClient.CoreApi({
  isProduction,
  serverKey,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
});
