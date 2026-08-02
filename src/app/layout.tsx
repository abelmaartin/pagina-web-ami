import type { Metadata } from "next";
// 1. Importamos Quicksand en lugar de Inter
import { Quicksand } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 2. Configuramos la fuente
const quicksand = Quicksand({ 
  subsets: ["latin"],
  // Opcional: puedes definir el peso (grosor) si quieres limitarlo, 
  // pero por defecto cargará los necesarios para Tailwind
});

export const metadata: Metadata = {
  title: "Agrupación Musical Isorana | Guía de Isora",
  description: "Web oficial de la Banda de Música de Guía de Isora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 3. Aplicamos la fuente (quicksand.className) al body */}
      <body className={`${quicksand.className} flex flex-col min-h-screen bg-slate-50`}>
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}