import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';  // استيراد CSS الخاص ببوتستراب
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KNET Payment Getaway",
  description: "KNET Payment Getaway",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <meta property="og:image" content="https://play-lh.googleusercontent.com/juxyEQv5REIDeHpHz75z0h86q4opDLfKsNQ_dNVO-yYFPl_MIwz93XbyLf2G2ipAQOU" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
  
        {children}

      </body>
    </html>
  );
}
