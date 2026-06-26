import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-base/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-3xl font-serif font-semibold tracking-wide text-brand">
            Invitea.
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/templates?kategori=undangan" className="text-sm font-sans font-medium text-text-main hover:text-brand transition-colors">
            Undangan
          </Link>
          <Link href="/templates?kategori=ucapan" className="text-sm font-sans font-medium text-text-main hover:text-brand transition-colors">
            Ucapan
          </Link>
          <Link href="/#harga" className="text-sm font-sans font-medium text-text-main hover:text-brand transition-colors">
            Harga
          </Link>
          <Link href="/#cara-kerja" className="text-sm font-sans font-medium text-text-main hover:text-brand transition-colors">
            Cara Kerja
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-4">
          <Link href="/templates">
            <Button className="rounded-xl px-6 font-sans">Buat Sekarang</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
