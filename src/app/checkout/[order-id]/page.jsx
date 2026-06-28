import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Heart, ShieldAlert, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import CheckoutButton from "@/components/checkout/CheckoutButton";

export async function generateMetadata(props) {
  const params = await props.params;
  return {
    title: `Checkout Order - Invitea`,
  };
}

export default async function CheckoutPage(props) {
  const params = await props.params;
  const { "order-id": orderId } = params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // 1. Fetch order data dari Supabase
  const { data: order, error } = await supabase
    .from('orders')
    .select('*, templates(*)')
    .eq('id', orderId)
    .single();

  if (error || !order) {
    console.error("Order not found or error:", error);
    notFound();
  }

  const template = order.templates;
  const dataContent = order.data_content || {};
  const fotoUrls = order.foto_urls || [];

  // Ekstrak info penting
  // Cari nama panggilan dari field (asumsikan kita punya pria_panggilan & wanita_panggilan)
  const namaPria = dataContent.pria_panggilan || "Pria";
  const namaWanita = dataContent.wanita_panggilan || "Wanita";
  const judulUndangan = `${namaPria} & ${namaWanita}`;
  
  // Tanggal acara 1
  const tanggalAcara = dataContent.acara1_tanggal ? new Date(dataContent.acara1_tanggal).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : "Tanggal belum ditentukan";

  // Thumbnail
  const thumbnailUrl = fotoUrls.length > 0 ? fotoUrls[0] : (template?.thumbnail_url || '/template-dummy.png');

  // Harga
  const harga = template?.harga || template?.price || 0;

  return (
    <div className="min-h-screen bg-bg-base pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-text-main mb-2">Checkout Pembayaran</h1>
          <p className="text-text-muted">Selesaikan pembayaran untuk mengaktifkan undangan Anda secara penuh.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Kolom Kiri: Detail Order */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Box Alert Masa Aktif */}
            <div className="bg-brand-light/30 border border-brand/20 rounded-2xl p-5 flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-brand shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-brand-dark mb-1">Informasi Masa Aktif</h4>
                <p className="text-sm text-brand-dark/80 leading-relaxed">
                  Undangan Anda akan aktif secara permanen hingga <strong>1 bulan</strong> sejak tanggal pembuatan. 
                  Selesaikan pembayaran untuk menikmati seluruh fitur Invitea tanpa batasan preview.
                </p>
              </div>
            </div>

            {/* Preview Order */}
            <Card className="overflow-hidden border-border-subtle shadow-sm">
              <div className="bg-white p-6">
                <h3 className="font-serif font-medium text-lg text-text-main mb-6 border-b border-border-subtle pb-4">
                  Pratinjau Undangan
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div className="relative w-32 h-48 rounded-xl overflow-hidden shadow-sm shrink-0 bg-accent-sand/20">
                    <Image
                      src={thumbnailUrl}
                      alt={judulUndangan}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-4 text-center sm:text-left">
                    <div>
                      <p className="text-xs font-semibold text-brand tracking-wider uppercase mb-1">Pasangan Berbahagia</p>
                      <h4 className="font-serif text-2xl text-text-main flex items-center justify-center sm:justify-start gap-2">
                        {namaPria} <Heart className="w-5 h-5 text-brand fill-brand" /> {namaWanita}
                      </h4>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-text-muted tracking-wider uppercase mb-1">Tanggal Acara Utama</p>
                      <p className="flex items-center justify-center sm:justify-start gap-2 text-text-main font-medium">
                        <Calendar className="w-4 h-4 text-brand" />
                        {tanggalAcara}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Template: {template?.name || 'Custom'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

          </div>

          {/* Kolom Kanan: Rincian Pembayaran */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Card className="border-border-subtle shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <CardContent className="p-6 space-y-6">
                  <h3 className="font-serif font-medium text-lg text-text-main border-b border-border-subtle pb-4">
                    Ringkasan Order
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Template {template?.name}</span>
                      <span className="font-medium text-text-main">Rp {harga.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Biaya Layanan</span>
                      <span className="font-medium text-text-main">Gratis</span>
                    </div>
                  </div>

                  <div className="border-t border-border-subtle pt-4 flex justify-between items-center">
                    <span className="font-semibold text-text-main">Total Bayar</span>
                    <span className="font-serif text-xl font-bold text-brand">
                      Rp {harga.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <CheckoutButton orderId={orderId} />
                  
                  <p className="text-xs text-center text-text-muted">
                    Pembayaran diproses secara aman. Anda akan diarahkan ke halaman pembayaran Midtrans.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
