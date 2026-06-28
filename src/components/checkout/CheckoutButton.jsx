"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Script from "next/script";

export default function CheckoutButton({ orderId }) {
  const [isLoading, setIsLoading] = useState(false);
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // 1. Dapatkan token dari backend
      const res = await fetch("/api/midtrans/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId }),
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal menghubungi server pembayaran");
      }

      // 2. Tampilkan popup Midtrans
      if (window.snap) {
        window.snap.pay(data.token, {
          onSuccess: function(result) {
            console.log("Payment success:", result);
            window.location.href = `/status/${orderId}`;
          },
          onPending: function(result) {
            console.log("Payment pending:", result);
            window.location.href = `/status/${orderId}`;
          },
          onError: function(result) {
            console.error("Payment error:", result);
            alert("Pembayaran gagal atau terjadi kesalahan.");
            setIsLoading(false);
          },
          onClose: function() {
            console.log("Customer closed the popup without finishing the payment");
            setIsLoading(false);
          }
        });
      } else {
        throw new Error("Midtrans script belum ter-load sempurna.");
      }

    } catch (error) {
      console.error(error);
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={clientKey}
        strategy="lazyOnload" // atau beforeInteractive
      />
      <Button 
        onClick={handlePayment} 
        disabled={isLoading}
        className="w-full h-12 text-base rounded-xl shadow-md hover:-translate-y-1 transition-transform group"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <CreditCard className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        )}
        {isLoading ? "Memproses..." : "Bayar Sekarang"}
      </Button>
    </>
  );
}
