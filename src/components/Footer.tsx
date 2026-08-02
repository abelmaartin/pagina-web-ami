import Link from 'next/link';

export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* COLUMNA 1: Sobre la banda (Ocupa más espacio) */}
          <div className="md:col-span-12 lg:col-span-5">
            <span className="font-bold text-2xl text-white tracking-tight flex items-center gap-2 mb-4">
              A.M. <span className="text-indigo-400">Isorana</span>
            </span>
            <p className="text-slate-400 mb-6 leading-relaxed max-w-md">
              Más de 60 años poniendo banda sonora al municipio de Guía de Isora. Fomentando la cultura, la educación musical y la tradición de generación en generación.
            </p>
            
            {/* Redes Sociales - Versión Dark Mode */}
            <div className="flex gap-3">
              {/* Facebook */}
              <a href="https://www.facebook.com/p/Agrupaci%C3%B3n-Musical-Isorana-100063679471614/?locale=es_ES" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/agrupacionmusicalisorana/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@a.m.isorana?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@agrupacionmusicalisorana1958" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMNA 2: Enlaces Rápidos */}
          <div className="md:col-span-6 lg:col-span-3 lg:col-start-7">
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Navegación</h3>
            <ul className="space-y-3">
              <li><Link href="/nosotros" className="text-slate-400 hover:text-indigo-400 transition-colors">La Banda</Link></li>
              <li><Link href="/academia" className="text-slate-400 hover:text-indigo-400 transition-colors">Escuela de Música</Link></li>
              <li><Link href="/eventos" className="text-slate-400 hover:text-indigo-400 transition-colors">Próximos Eventos</Link></li>
              <li><Link href="/galeria" className="text-slate-400 hover:text-indigo-400 transition-colors">Galería de Fotos</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-indigo-400 transition-colors">Noticias</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: Contacto */}
          <div className="md:col-span-6 lg:col-span-3">
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <svg className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Local Agrupación Musical Isorana, junto al parque infantil<br/>Calle del Campo, 15, Guía de Isora</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <svg className="w-5 h-5 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>agrupacionmusicalisorana@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <svg className="w-5 h-5 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+34 663 453 335</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <svg className="w-5 h-5 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+34 616 512 292</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <svg className="w-5 h-5 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+34 669 299 986</span>
              </li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT & CRÉDITOS */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {anioActual} Agrupación Musical Isorana. Todos los derechos reservados.
          </p>
          <div className="text-sm text-slate-500 flex gap-4">
            <Link href="/privacidad" className="hover:text-slate-300 transition-colors">Aviso Legal</Link>
            <Link href="/cookies" className="hover:text-slate-300 transition-colors">Política de Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}