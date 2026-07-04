import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Invitea - Digital Invitations",
  description: "Create elegant digital invitations for your special moments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-bg-base text-text-main font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
