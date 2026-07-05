"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal login");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-bg transition-colors duration-400 flex flex-col items-center justify-center p-[24px] relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-pink-soft/60 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-berry/5 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px] bg-bg-alt rounded-[6px] shadow-sm border border-hairline p-[clamp(32px,5vw,48px)] relative z-10"
      >
        <div className="text-center mb-[40px]">
          <h1 className="font-serif italic text-[36px] font-semibold text-ink mb-[4px]">Invitea.</h1>
          <p className="text-ink-soft text-[11.5px] font-bold uppercase tracking-[0.1em]">Admin Portal</p>
        </div>

        {error && (
          <div className="mb-[24px] p-[16px] bg-red-50/80 text-red-600 border border-red-200/50 rounded-[6px] text-[13.5px] text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-[24px]">
          <div className="space-y-[8px]">
            <label className="text-[13px] font-semibold text-ink ml-[2px]">Email</label>
            <div className="relative">
              <Mail className="absolute left-[16px] top-1/2 -translate-y-1/2 w-5 h-5 text-ink-soft" />
              <input
                type="email"
                required
                placeholder="admin@invitea.cards"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-[48px] pr-[16px] py-[14px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[14.5px] text-ink placeholder:text-ink-soft/60"
              />
            </div>
          </div>

          <div className="space-y-[8px]">
            <label className="text-[13px] font-semibold text-ink ml-[2px]">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-[16px] top-1/2 -translate-y-1/2 w-5 h-5 text-ink-soft" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-[48px] pr-[16px] py-[14px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[14.5px] text-ink placeholder:text-ink-soft/60"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full group flex items-center justify-center gap-[8px] bg-pink-btn-bg text-cream-text py-[16px] rounded-full font-semibold text-[15px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)] hover:-translate-y-[2px] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-pink)] disabled:opacity-70 disabled:hover:shadow-none mt-[8px]"
          >
            {isLoading ? (
              <span className="flex items-center gap-[8px]">
                <span className="w-4 h-4 border-[2.5px] border-white/20 border-t-white rounded-full animate-spin" />
                Memproses...
              </span>
            ) : (
              <>
                Masuk ke Dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-[32px] text-center">
          <p className="text-[12px] text-ink-soft">
            Halaman ini khusus untuk administrator Invitea.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
