import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Kita butuh Service Role Key untuk update tabel yang diproteksi RLS (jika ada)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const payload = await request.json();
    const {
      order_id,
      transaction_status,
      fraud_status,
      signature_key,
      status_code,
      gross_amount
    } = payload;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    // 1. Verifikasi Signature
    // Signature dari Midtrans = SHA512(order_id + status_code + gross_amount + serverKey)
    const rawString = `${order_id}${status_code}${gross_amount}${serverKey}`;
    const hashedString = crypto.createHash('sha512').update(rawString).digest('hex');

    if (hashedString !== signature_key) {
      console.warn("Invalid Midtrans Signature:", order_id);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 2. Ekstrak Order ID Asli
    // Di fase 5.2, kita format order_id = [UUID]-[timestamp]. 
    // Jadi kita ambil semua bagian sebelum strip (-) terakhir.
    const actualOrderId = order_id.substring(0, order_id.lastIndexOf('-'));
    if (!actualOrderId) {
      return NextResponse.json({ error: "Invalid order_id format" }, { status: 400 });
    }

    // 3. Tentukan Status Akhir
    let finalStatus = null;

    if (transaction_status === 'capture') {
      if (fraud_status === 'challenge') {
        finalStatus = 'pending';
      } else if (fraud_status === 'accept') {
        finalStatus = 'success';
      }
    } else if (transaction_status === 'settlement') {
      finalStatus = 'success';
    } else if (transaction_status === 'cancel' || transaction_status === 'deny' || transaction_status === 'expire') {
      finalStatus = 'failed';
    } else if (transaction_status === 'pending') {
      finalStatus = 'pending';
    }

    // 4. Update Database
    if (finalStatus) {
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status_payment: finalStatus })
        .eq('id', actualOrderId);

      if (updateError) {
        console.error("Gagal update order status di Supabase:", updateError);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }

      console.log(`Order ${actualOrderId} updated to ${finalStatus}`);

      // Fase 6: Jika finalStatus === 'success', generate URL undangan live (slug).
      if (finalStatus === 'success') {
        const { data: orderData } = await supabase
          .from('orders')
          .select('*, templates(*)')
          .eq('id', actualOrderId)
          .single();

        if (orderData && !orderData.slug) {
          const isUcapan = (orderData.templates?.category || orderData.templates?.kategori)?.toLowerCase().includes("ucapan");
          const dataContent = orderData.data_content || {};
          
          let baseSlug = "";
          if (isUcapan) {
            const penerima = dataContent.nama_penerima || "penerima";
            baseSlug = `untuk-${penerima.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          } else {
            const pria = dataContent.nama_pria || "pria";
            const wanita = dataContent.nama_wanita || "wanita";
            baseSlug = `${pria.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${wanita.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          }

          // Pastikan ujung string bukan dash (-)
          baseSlug = baseSlug.replace(/-+$/, '');
          
          let uniqueSlug = baseSlug;
          let isUnique = false;
          
          while (!isUnique) {
             const { data: existing } = await supabase.from('orders').select('id').eq('slug', uniqueSlug).maybeSingle();
             if (!existing) {
               isUnique = true;
             } else {
               const randomStr = crypto.randomBytes(2).toString('hex');
               uniqueSlug = `${baseSlug}-${randomStr}`;
             }
          }
          
          const { error: slugError } = await supabase
            .from('orders')
            .update({ 
              slug: uniqueSlug,
              magic_token: crypto.randomUUID(),
              expired_at: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
            })
            .eq('id', actualOrderId);

          if (slugError) {
             console.error("Gagal menyimpan slug:", slugError);
          } else {
             console.log(`Berhasil membuat slug ${uniqueSlug} untuk pesanan ${actualOrderId}`);
             
             // Kirim Email Receipt via Resend
             try {
               // Perhatikan: Jika domain belum diverifikasi di Resend, 'from' harus menggunakan onboarding@resend.dev
               // dan email penerima ('to') HANYA BISA dikirim ke email terdaftar di akun Resend Anda.
               // Nanti ubah ke "hello@invitea.cards" jika domain sudah diverifikasi di Resend.
               const fromEmail = process.env.NODE_ENV === 'development' ? 'onboarding@resend.dev' : 'onboarding@resend.dev'; 
               
               const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://invitea-cards.vercel.app';
               const magicLink = `${baseUrl}/order/${orderData.magic_token}`;
               const liveLink = `${baseUrl}/live/${uniqueSlug}`;
               
               await resend.emails.send({
                 from: \`Invitea <\${fromEmail}>\`,
                 to: [orderData.email],
                 subject: '🎉 Pembayaran Berhasil! Undangan Anda Sudah Aktif',
                 html: \`
                   <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                     <h2 style="color: #4F46E5;">Terima kasih atas pesanan Anda!</h2>
                     <p>Halo, pembayaran untuk undangan digital Anda telah berhasil kami terima.</p>
                     
                     <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                       <p style="margin: 0 0 10px 0;"><strong>Link Undangan Live Anda:</strong></p>
                       <a href="\${liveLink}" style="color: #4F46E5; font-size: 16px;">\${liveLink}</a>
                       
                       <p style="margin: 15px 0 10px 0;"><strong>Akses Dashboard Admin Anda:</strong></p>
                       <a href="\${magicLink}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">Buka Dashboard / Edit Undangan</a>
                     </div>
                     
                     <p style="color: #6B7280; font-size: 14px;"><strong>PENTING:</strong> Simpan email ini baik-baik. Link dashboard di atas adalah kunci rahasia Anda untuk melihat dan mengubah isi undangan.</p>
                   </div>
                 \`
               });
               console.log("Email receipt berhasil dikirim ke:", orderData.email);
             } catch (emailError) {
               console.error("Gagal mengirim email receipt:", emailError);
             }
          }
        }
      }
    }

    // 5. Berikan respons OK agar Midtrans tidak retry webhook ini terus menerus
    return NextResponse.json({ success: true, message: "OK" }, { status: 200 });
    
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
