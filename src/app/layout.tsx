import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './style.css'

import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magic game 2",
  description: "Magic game 2 by js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
