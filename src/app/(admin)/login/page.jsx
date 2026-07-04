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

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi loading sebelum masuk ke dashboard
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-bg-base flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-light/40 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand/10 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle p-8 md:p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl font-bold tracking-widest text-brand mb-2">Invitea</h1>
          <p className="text-text-muted text-sm font-medium uppercase tracking-widest">Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-main ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="email"
                required
                placeholder="admin@invitea.cards"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-bg-base border border-border-subtle rounded-2xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-main ml-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-bg-base border border-border-subtle rounded-2xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full group flex items-center justify-center gap-2 bg-brand text-white py-3.5 rounded-2xl font-medium hover:bg-brand/90 transition-all shadow-md shadow-brand/20 disabled:opacity-70 mt-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
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

        <div className="mt-8 text-center">
          <p className="text-xs text-text-muted">
            Halaman ini khusus untuk administrator Invitea.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
