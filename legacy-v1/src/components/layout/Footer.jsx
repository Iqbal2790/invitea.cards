import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-berry-deep text-[oklch(88%_0.02_70/0.85)] py-[clamp(56px,7vw,80px)] pb-8 transition-colors duration-400">
      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-[clamp(32px,5vw,60px)]">
          <div>
            <div className="text-cream-text font-serif text-[28px] font-semibold mb-[14px]">
              Invitea.
            </div>
            <p className="max-w-[38ch] text-[oklch(88%_0.02_70/0.65)] text-[14.5px]">
              Sebarkan momen bahagiamu dengan undangan digital yang cantik, penuh makna, dan mudah dibagikan ke seluruh orang terkasih.
            </p>
          </div>
          
          <div className="flex flex-col">
            <h4 className="font-sans text-[13px] font-bold tracking-[0.04em] uppercase text-[oklch(88%_0.02_70/0.55)] mb-4">
              Kategori
            </h4>
            <Link href="/templates?kategori=undangan" className="block text-[14.5px] text-[oklch(94%_0.02_70/0.85)] mb-[10px] hover:text-pink transition-colors">
              Undangan Pernikahan
            </Link>
            <Link href="/templates?kategori=ucapan" className="block text-[14.5px] text-[oklch(94%_0.02_70/0.85)] mb-[10px] hover:text-pink transition-colors">
              Kartu Ucapan
            </Link>
          </div>
          
          <div className="flex flex-col">
            <h4 className="font-sans text-[13px] font-bold tracking-[0.04em] uppercase text-[oklch(88%_0.02_70/0.55)] mb-4">
              Bantuan
            </h4>
            <Link href="/#cara-kerja" className="block text-[14.5px] text-[oklch(94%_0.02_70/0.85)] mb-[10px] hover:text-pink transition-colors">
              Cara Kerja
            </Link>
            <Link href="/faq" className="block text-[14.5px] text-[oklch(94%_0.02_70/0.85)] mb-[10px] hover:text-pink transition-colors">
              FAQ
            </Link>
          </div>
        </div>
        
        <div className="mt-14 pt-6 border-t border-[oklch(80%_0.02_70/0.15)] text-[13px] text-[oklch(88%_0.02_70/0.5)] flex flex-col md:flex-row items-center justify-between">
          <div>&copy; {new Date().getFullYear()} Invitea. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
