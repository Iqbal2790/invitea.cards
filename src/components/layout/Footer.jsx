export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-subtle py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="text-left max-w-sm space-y-4">
          <h2 className="font-serif text-3xl font-semibold text-brand tracking-wide">Invitea.</h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Sebarkan momen bahagiamu dengan undangan digital yang cantik, penuh makna, dan mudah dibagikan ke seluruh orang terkasih.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-12 text-sm">
          <div className="space-y-4">
            <h4 className="font-semibold tracking-widest text-text-main uppercase text-xs">Kategori</h4>
            <div className="flex flex-col gap-3">
              <a href="/templates?kategori=undangan" className="text-text-muted hover:text-brand transition-colors">Undangan Pernikahan</a>
              <a href="/templates?kategori=ucapan" className="text-text-muted hover:text-brand transition-colors">Kartu Ucapan</a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold tracking-widest text-text-main uppercase text-xs">Bantuan</h4>
            <ul className="space-y-3 font-sans">
              <li><a className="text-sm text-text-muted hover:text-brand transition-colors" href="/#cara-kerja">Cara Kerja</a></li>
              <li><a className="text-sm text-text-muted hover:text-brand transition-colors" href="/faq">FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between text-xs text-text-muted">
        <div>&copy; {new Date().getFullYear()} Invitea. All rights reserved.</div>
      </div>
    </footer>
  );
}
