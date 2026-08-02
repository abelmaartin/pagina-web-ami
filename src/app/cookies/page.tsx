export default function Cookies() {
  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Política de Cookies</h1>
        
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">¿Qué son las cookies?</h2>
            <p>
              Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">¿Qué tipos de cookies utiliza esta página web?</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Cookies técnicas:</strong> Son aquellas necesarias para la navegación y el buen funcionamiento de nuestra página web. Permiten, por ejemplo, controlar el tráfico y la comunicación de datos o compartir contenidos a través de redes sociales.
              </li>
              <li>
                <strong>Cookies de terceros:</strong> Al incluir mapas de Google Maps en nuestra sección de contacto, es posible que Google instale cookies técnicas o de personalización. La Agrupación Musical Isorana no tiene control sobre estas cookies.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Revocación y eliminación de cookies</h2>
            <p>
              Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador. Al desactivar las cookies, algunos de los servicios disponibles podrían dejar de estar operativos.
            </p>
          </section>
        </div>

      </div>
    </main>
  );
}