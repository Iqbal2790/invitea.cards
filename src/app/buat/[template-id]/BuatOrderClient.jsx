"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";

import WeddingClassicForm from "@/components/forms/WeddingClassicForm";
import GreetingMinimalistForm from "@/components/forms/GreetingMinimalistForm";

// Map Template ID to Specific Form Component
const FORM_COMPONENTS = {
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11': WeddingClassicForm, // Elegance Rose
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22': GreetingMinimalistForm // Midnight Magic
};

export default function BuatOrderClient({ template }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // 1. Generate Order ID
      const order_id = crypto.randomUUID();
      
      // 2. Smart File Upload: Cari semua File object dalam formData
      let foto_urls = [];
      const data_content = { ...formData };
      
      for (const [key, value] of Object.entries(data_content)) {
        if (value instanceof File) {
          // Single file upload
          const uploadData = new FormData();
          uploadData.append("file", value);
          uploadData.append("order_id", order_id);
          
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: uploadData,
          });
          
          const uploadResult = await uploadRes.json();
          if (!uploadRes.ok) throw new Error(uploadResult.error || "Gagal upload foto");
          
          // Simpan URL di data_content dan juga di foto_urls
          data_content[key] = uploadResult.url;
          foto_urls.push(uploadResult.url);

        } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
          // Multiple file upload
          const urls = [];
          for (const file of value) {
            const uploadData = new FormData();
            uploadData.append("file", file);
            uploadData.append("order_id", order_id);
            
            const uploadRes = await fetch("/api/upload", {
              method: "POST",
              body: uploadData,
            });
            
            const uploadResult = await uploadRes.json();
            if (!uploadRes.ok) throw new Error(uploadResult.error || "Gagal upload foto");
            
            urls.push(uploadResult.url);
            foto_urls.push(uploadResult.url);
          }
          data_content[key] = urls;
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

  const SelectedForm = FORM_COMPONENTS[template.id];

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
          {/* Template Info Card */}
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

          <div className="p-6 md:p-10 relative">
            {isLoading && (
              <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
                <Loader2 className="w-12 h-12 animate-spin text-brand mb-4" />
                <h3 className="text-lg font-semibold text-text-main">Memproses Data...</h3>
                <p className="text-sm text-text-muted text-center max-w-xs mt-2">
                  Mohon tunggu sebentar, kami sedang menyimpan informasi dan mengunggah foto Anda.
                </p>
              </div>
            )}
            
            {SelectedForm ? (
              <SelectedForm onSubmit={handleSubmit} isLoading={isLoading} />
            ) : (
              <div className="p-8 text-center text-text-muted bg-gray-50 rounded-xl border border-dashed border-border-subtle">
                Form untuk template ini belum tersedia.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
