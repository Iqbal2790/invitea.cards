"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { 
  Copy, 
  ExternalLink, 
  Download, 
  Calendar, 
  Clock, 
  MessageCircle, 
  Mail,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";

export default function MagicLinkPage() {
  const params = useParams();
  const magicToken = params["magic-token"];

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      if (!magicToken) return;
      
      const { data, error } = await supabase
        .from("orders")
        .select("*, templates(*)")
        .eq("magic_token", magicToken)
        .single();

      if (error || !data) {
        setError("Tautan tidak valid atau pesanan tidak ditemukan.");
      } else {
        setOrderData(data);
      }
      setLoading(false);
    }

    fetchOrder();
  }, [magicToken]);

  const liveUrl = orderData?.slug 
    ? (typeof window !== "undefined" ? `${window.location.origin}/live/${orderData.slug}` : "")
    : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QR-Code-Invitea-${orderData?.slug}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-md w-full border border-border-subtle">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4 opacity-80" />
          <h1 className="font-serif text-2xl text-text-main mb-2">Tautan Tidak Valid</h1>
          <p className="text-text-muted">Maaf, tautan ajaib yang Anda buka tidak valid atau mungkin sudah kedaluwarsa.</p>
        </div>
      </div>
    );
  }

  const isExpired = new Date() > new Date(orderData.expired_at);
  const formattedExpired = orderData.expired_at ? new Date(orderData.expired_at).toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }) : "Tidak diketahui";

  return (
    <div className="min-h-screen bg-bg-base py-12 px-4 selection:bg-brand selection:text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-border-subtle"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="font-serif text-3xl text-text-main mb-2">Dasbor Pesanan Anda</h1>
              <p className="text-text-muted text-sm">
                Kelola undangan Anda dengan mudah. Tautan halaman ini bersifat rahasia.
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${isExpired ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'} flex items-center gap-2 border ${isExpired ? 'border-red-100' : 'border-green-100'}`}>
              {isExpired ? <AlertCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              {isExpired ? 'Masa Aktif Habis' : 'Sedang Aktif'}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Main Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-border-subtle space-y-8"
          >
            <div>
              <p className="text-sm text-text-muted mb-2 uppercase tracking-wider font-semibold">Template Terpilih</p>
              <h2 className="font-serif text-3xl text-brand">{orderData.templates?.nama || "Template"}</h2>
            </div>

            {/* Masa Aktif */}
            <div className="bg-brand/5 border border-brand/10 p-6 rounded-2xl flex items-start gap-4">
              <Calendar className="w-6 h-6 text-brand mt-1 shrink-0" />
              <div>
                <h3 className="font-medium text-text-main text-lg">Masa Aktif Undangan</h3>
                <p className="text-sm text-text-muted mt-2 leading-relaxed">Undangan digital Anda dapat diakses secara online oleh tamu hingga batas waktu berikut:</p>
                <p className="text-brand font-semibold mt-2 text-lg">{formattedExpired}</p>
              </div>
            </div>

            {/* Tautan Undangan */}
            <div>
              <h3 className="font-medium text-text-main mb-3">Tautan Undangan (Bagikan ke Tamu)</h3>
              <div className="flex bg-bg-base rounded-xl border border-border-subtle overflow-hidden focus-within:border-brand transition-colors">
                <input 
                  type="text" 
                  readOnly 
                  value={liveUrl}
                  className="flex-1 bg-transparent px-4 py-3 text-text-main text-sm outline-none w-full"
                />
                <button 
                  onClick={handleCopy}
                  className="px-6 py-3 bg-brand text-white hover:bg-brand-dark transition flex items-center gap-2 font-medium text-sm shrink-0"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Tersalin' : 'Salin'}
                </button>
              </div>
            </div>

            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-text-main text-white hover:bg-text-main/90 transition font-medium shadow-sm hover:shadow-md"
            >
              Buka Pratinjau Undangan <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Sidebar - QR & Help */}
          <div className="md:col-span-2 space-y-8 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-border-subtle text-center flex flex-col items-center flex-1"
            >
              <h3 className="font-serif text-xl text-text-main mb-2">QR Code Undangan</h3>
              <p className="text-sm text-text-muted mb-6">Tamu dapat memindai kode ini dari HP mereka.</p>
              
              {/* QR Code Container */}
              <div className="bg-white p-4 rounded-xl border border-border-subtle inline-block mb-4 shadow-sm">
                {liveUrl ? (
                  <QRCode
                    id="qr-code-svg"
                    value={liveUrl}
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#1c211b"
                    level="Q"
                  />
                ) : (
                  <div className="w-[200px] h-[200px] flex items-center justify-center bg-bg-base rounded-lg border border-border-subtle">
                    <span className="text-text-muted text-sm">Menyiapkan QR...</span>
                  </div>
                )}
              </div>

              <button 
                onClick={handleDownloadQR}
                className="w-full mt-auto flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-brand text-brand hover:bg-brand hover:text-white transition font-medium"
              >
                <Download className="w-4 h-4" /> Unduh Gambar QR
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-brand to-brand-dark p-8 rounded-3xl shadow-lg text-white"
            >
              <h3 className="font-serif text-xl mb-2">Butuh Bantuan?</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Ada kesalahan penulisan gelar atau lokasi? Hubungi tim desain kami.
              </p>
              
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition p-3 rounded-xl backdrop-blur-sm">
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span className="font-medium text-sm">Hubungi via WhatsApp</span>
                </a>
                <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition p-3 rounded-xl backdrop-blur-sm">
                  <Mail className="w-5 h-5 shrink-0" />
                  <span className="font-medium text-sm">Email Bantuan</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
