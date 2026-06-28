"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

export default function RsvpForm({ invitation_id }) {
  const [formData, setFormData] = useState({
    nama_tamu: "",
    hadir: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama_tamu.trim()) {
      setError("Nama harus diisi");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitation_id: invitation_id || "demo-invitation-id",
          nama_tamu: formData.nama_tamu,
          hadir: formData.hadir,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Terjadi kesalahan");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl shadow-brand/5 border border-brand/10 text-center space-y-4 max-w-md mx-auto transform transition-all duration-500 scale-100 opacity-100">
        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-brand-light/30 text-brand mb-2">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-serif text-text-main">Terima Kasih!</h3>
        <p className="text-text-muted">
          Konfirmasi kehadiran Anda telah kami terima. Kami tidak sabar menyambut Anda.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl shadow-brand/5 border border-border-subtle max-w-md mx-auto w-full space-y-6 transition-all duration-300 hover:shadow-2xl hover:shadow-brand/10">
      <div className="text-center space-y-2 mb-2">
        <h3 className="text-2xl font-serif text-text-main">Konfirmasi Kehadiran</h3>
        <p className="text-sm text-text-muted">Beritahu kami jika Anda bisa hadir.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="nama_tamu" className="block text-sm font-medium text-text-main mb-2">
            Nama Lengkap Anda <span className="text-red-500">*</span>
          </label>
          <input
            id="nama_tamu"
            type="text"
            placeholder="Ketik nama Anda di sini..."
            required
            value={formData.nama_tamu}
            onChange={(e) => setFormData({ ...formData, nama_tamu: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-bg-base text-text-main focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-3">
            Apakah Anda akan hadir?
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, hadir: true })}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 border ${
                formData.hadir 
                  ? 'bg-brand text-white border-brand shadow-md' 
                  : 'bg-white text-text-muted border-border-subtle hover:border-brand/50 hover:bg-brand-light/10'
              }`}
            >
              Ya, Hadir
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, hadir: false })}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 border ${
                !formData.hadir 
                  ? 'bg-gray-100 text-gray-800 border-gray-300 shadow-inner' 
                  : 'bg-white text-text-muted border-border-subtle hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              Maaf, Tidak
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-md text-sm font-semibold text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Mengirim...
          </>
        ) : (
          "Kirim Konfirmasi"
        )}
      </button>
    </form>
  );
}
