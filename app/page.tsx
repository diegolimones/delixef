export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="hero py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container-custom text-center">
          <h1 className="font-playfair text-5xl md:text-6xl mb-6">Delixef</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">Chef Privado en Ibiza</p>
          <p className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Experiencias gastronómicas exclusivas diseñadas para ti. Desayunos, comidas, cenas y eventos personalizados.
          </p>
          <a
            href="/reservar"
            className="btn-primary inline-block text-lg"
          >
            Reservar Ahora
          </a>
        </div>
      </section>

      <section className="servicios py-24 bg-white">
        <div className="container-custom">
          <h2 className="font-playfair text-4xl text-center mb-16">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Desayunos', 'Comidas', 'Cenas', 'Eventos'].map((servicio) => (
              <div key={servicio} className="p-6 border border-gold rounded-lg hover:shadow-lg transition">
                <h3 className="font-playfair text-2xl mb-4 text-gold">{servicio}</h3>
                <p className="text-gray-600">Experiencias culinarias personalizadas según tus preferencias</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
