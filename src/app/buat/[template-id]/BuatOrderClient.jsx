"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/forms/DynamicForm";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function BuatOrderClient({ template }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // 1. Generate Order ID
      const order_id = crypto.randomUUID();
      
      // 2. Pisahkan field "photo" dari data content lainnya
      let foto_urls = [];
      const data_content = { ...formData };
      
      // Cari field mana yang merupakan photo (array File)
      // Note: Di form kita, photo upload mengirimkan array of File
      const photoFields = template.fields_config.filter(f => f.type === "photo");
      
      for (const photoField of photoFields) {
        const files = formData[photoField.name];
        if (files && Array.isArray(files) && files.length > 0) {
          // Hapus dari data_content agar tidak ikut masuk ke JSON
          delete data_content[photoField.name];
          
          for (const file of files) {
            const uploadData = new FormData();
            uploadData.append("file", file);
            uploadData.append("order_id", order_id);
            
            const uploadRes = await fetch("/api/upload", {
              method: "POST",
              body: uploadData,
            });
            
            const uploadResult = await uploadRes.json();
            if (!uploadRes.ok) throw new Error(uploadResult.error || "Gagal upload foto");
            
            foto_urls.push(uploadResult.url);
          }
        }
      }

      // 3. Kirim semua data ke /api/orders
      const orderPayload = {
        order_id,
        email: data_content.email || "user@example.com", // Fallback jika tidak ada input email
        template_id: template.id,
        data_content,
        foto_urls
      };

      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const orderResult = await orderRes.json();
      
      if (!orderRes.ok) {
        throw new Error(orderResult.error || "Gagal membuat order");
      }

      // 4. Redirect ke halaman checkout
      router.push(`/checkout/${order_id}`);

    } catch (error) {
      console.error(error);
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        
        {/* Header Section */}
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif text-text-main">
            Lengkapi Informasi Anda
          </h1>
          <p className="text-text-muted">
            Template terpilih: <span className="font-semibold text-brand">{template.name}</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle overflow-hidden">
          {/* Template Info Card (Top inside the form container) */}
          <div className="bg-brand-light/20 p-6 flex items-center gap-6 border-b border-border-subtle">
            <div className="w-16 h-16 relative rounded-xl overflow-hidden shrink-0 shadow-sm">
              <Image 
                src={template.thumbnail_url || "/template-dummy.png"} 
                alt={template.name || 'Template Image'}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <h3 className="text-lg font-serif font-semibold text-text-main">{template.name}</h3>
              <p className="text-sm text-text-muted">{template.category || template.kategori || 'Template'}</p>
            </div>
          </div>

          <div className="p-6 md:p-10">
            {isLoading && (
              <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
                <Loader2 className="w-12 h-12 animate-spin text-brand mb-4" />
                <h3 className="text-lg font-semibold text-text-main">Memproses Data...</h3>
                <p className="text-sm text-text-muted text-center max-w-xs mt-2">
                  Mohon tunggu sebentar, kami sedang menyimpan informasi dan mengunggah foto Anda.
                </p>
              </div>
            )}
            
            <DynamicForm 
              fields={template.fields_config} 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
