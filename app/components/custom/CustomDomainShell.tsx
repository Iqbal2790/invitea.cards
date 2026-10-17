import { Globe, Heart, ShieldCheck } from "lucide-react";
import type { HostContext } from "../../lib/host";

interface CustomDomainShellProps {
  hostContext: HostContext;
}

export function CustomDomainShell({ hostContext }: CustomDomainShellProps) {
  const domainName = hostContext.customDomain || hostContext.hostname;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D1E1E] flex flex-col items-center justify-center p-6 selection:bg-pink-200">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#2D1E1E]/10 p-8 shadow-sm text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#6E182A]/10 text-[#6E182A] mb-4">
          <Globe className="w-6 h-6" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-[#6E182A]/10 text-[#6E182A] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          Bespoke Custom Domain
        </div>

        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#2D1E1E] mb-2">
          {domainName}
        </h1>

        <p className="text-xs sm:text-sm text-[#2D1E1E]/70 leading-relaxed mb-6">
          Domain eksklusif ini terhubung langsung ke mesin Cloudflare Workers Invitea. Undangan digital bespoke pasangan ini siap ditampilkan.
        </p>

        <div className="pt-6 border-t border-[#2D1E1E]/10 flex items-center justify-center gap-2 text-xs text-[#2D1E1E]/60">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified by Invitea Bespoke Studio</span>
        </div>
      </div>
    </div>
  );
}
