"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO DE LA BANDA */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
              <Image 
                src="/logo.png" 
                alt="Logo Agrupación Musical Isorana" 
                width={48} 
                height={48} 
                className="object-contain"
              />
              <span className="font-bold text-xl md:text-2xl text-slate-800 tracking-tight hidden sm:block">
                A.M. <span className="text-indigo-600">Isorana</span>
              </span>
            </Link>
          </div>

          {/* ENLACES DE NAVEGACIÓN (Escritorio) - Ahora usamos lg:flex y ajustamos márgenes */}
          <div className="hidden lg:flex lg:space-x-6 xl:space-x-8">
            <Link href="/" className="text-slate-600 hover:text-indigo-600 px-2 py-2 text-sm font-medium transition-colors">
              Inicio
            </Link>
            <Link href="/nosotros" className="text-slate-600 hover:text-indigo-600 px-2 py-2 text-sm font-medium transition-colors">
              Nosotros
            </Link>
            <Link href="/academia" className="text-slate-600 hover:text-indigo-600 px-2 py-2 text-sm font-medium transition-colors">
              Academia
            </Link>
            <Link href="/eventos" className="text-slate-600 hover:text-indigo-600 px-2 py-2 text-sm font-medium transition-colors">
              Eventos
            </Link>
            <Link href="/galeria" className="text-slate-600 hover:text-indigo-600 px-2 py-2 text-sm font-medium transition-colors">
              Galería
            </Link>
            <Link href="/noticias" className="text-slate-600 hover:text-indigo-600 px-2 py-2 text-sm font-medium transition-colors">
              Noticias
            </Link>
          </div>

          {/* BOTÓN DE CONTACTO (Escritorio) - Cambiado a lg:flex */}
          <div className="hidden lg:flex items-center">
            <Link 
              href="/contacto" 
              className="px-5 py-2.5 bg-slate-800 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors shadow-sm whitespace-nowrap"
            >
              Contactar
            </Link>
          </div>

          {/* BOTÓN HAMBURGUESA (Móvil y Tablet) - Cambiado a lg:hidden */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 transition-colors"
              aria-label="Abrir menú principal"
            >
              {isOpen ? (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* --- MENÚ DESPLEGABLE MÓVIL Y TABLET --- Cambiado a lg:hidden */}
      <div 
        className={`lg:hidden absolute w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
          <Link href="/" onClick={closeMenu} className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
            Inicio
          </Link>
          <Link href="/nosotros" onClick={closeMenu} className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
            Nosotros
          </Link>
          <Link href="/academia" onClick={closeMenu} className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
            Academia
          </Link>
          <Link href="/eventos" onClick={closeMenu} className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
            Eventos
          </Link>
          <Link href="/galeria" onClick={closeMenu} className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
            Galería
          </Link>
          <Link href="/noticias" onClick={closeMenu} className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
            Noticias
          </Link>
          
          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link 
              href="/contacto" 
              onClick={closeMenu} 
              className="block w-full text-center px-5 py-3.5 bg-slate-800 text-white text-base font-bold rounded-xl hover:bg-slate-700 transition-colors shadow-md"
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}