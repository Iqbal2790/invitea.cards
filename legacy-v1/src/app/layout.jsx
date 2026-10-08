import { Cormorant_Garamond, Manrope } from "next/font/google";
import ThemeInitializer from "@/components/ThemeInitializer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Invitea - Digital Invitations",
  description: "Create elegant digital invitations for your special moments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${manrope.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-bg text-ink font-sans antialiased transition-colors duration-400 overflow-x-clip" suppressHydrationWarning>
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
