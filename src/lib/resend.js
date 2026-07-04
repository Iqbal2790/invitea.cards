import { Resend } from "resend";

// Inisialisasi client Resend
export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Mengirim email notifikasi sukses pesanan ke klien
 */
export async function sendOrderSuccessEmail({ email, templateName, magicToken, slug }) {
  const loginUrl = `https://invitea.cards/order/${magicToken}`;
  const liveUrl = `https://invitea.cards/u/${slug}`;

  // Karena user belum konfirmasi status domain, gunakan email bawaan Resend untuk testing.
  // Ganti `onboarding@resend.dev` dengan `noreply@domainanda.com` jika domain sudah diverifikasi.
  const fromEmail = "onboarding@resend.dev"; 

  const htmlContent = `
    <div style="font-family: sans-serif; max-w-xl; margin: 0 auto; color: #333;">
      <div style="text-align: center; padding: 20px 0;">
        <h1 style="color: #B76E79; margin-bottom: 0;">Invitea.</h1>
        <p style="color: #888; font-size: 14px; margin-top: 5px;">Pembayaran Anda Berhasil!</p>
      </div>

      <div style="background-color: #FAFAFA; border: 1px solid #EAEAEA; padding: 24px; border-radius: 12px;">
        <h2 style="margin-top: 0;">Halo!</h2>
        <p>Terima kasih telah mempercayakan momen spesial Anda bersama Invitea. Pesanan Anda untuk template <strong>${templateName}</strong> telah kami terima dan lunas.</p>
        
        <p>Anda kini memiliki akses ke Ruang Kontrol Pesanan Anda. Di sana Anda dapat mengelola tautan, melihat tamu yang akan hadir (RSVP), dan lain sebagainya.</p>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${loginUrl}" style="background-color: #B76E79; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">Masuk ke Ruang Kontrol</a>
        </div>

        <hr style="border: none; border-top: 1px solid #EAEAEA; margin: 24px 0;" />

        <p style="font-size: 14px; color: #666;">
          <strong>Tautan Live Pesanan Anda:</strong><br />
          <a href="${liveUrl}" style="color: #B76E79;">${liveUrl}</a>
        </p>
        <p style="font-size: 14px; color: #666;">
          <strong>Magic Token Anda (Simpan Baik-Baik):</strong><br />
          <code>${magicToken}</code>
        </p>
      </div>

      <div style="text-align: center; padding: 20px 0; font-size: 12px; color: #888;">
        &copy; ${new Date().getFullYear()} Invitea. Dibuat dengan ❤️ oleh tim kami.
      </div>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: `Invitea <${fromEmail}>`,
      to: [email],
      subject: "🎉 Pembayaran Berhasil! Akses Pesanan Anda",
      html: htmlContent,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Gagal mengirim email:", error);
    return { success: false, error };
  }
}
