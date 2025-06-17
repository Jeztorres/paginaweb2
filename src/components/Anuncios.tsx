import React, { useState } from 'react';
import { Bell, Calendar, Info, X, Mail, CheckCircle } from 'lucide-react';

interface Anuncio {
  id: number;
  titulo: string;
  resumen: string;
  fecha: string;
  categoria: string;
  imagen: string;
  contenidoCompleto: string;
  detalles?: string[];
}

const Anuncios = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [anuncioSeleccionado, setAnuncioSeleccionado] = useState<Anuncio | null>(null);
  const [emailSuscripcion, setEmailSuscripcion] = useState('');
  const [suscripcionExitosa, setSuscripcionExitosa] = useState(false);
  const [mostrarSuscripcion, setMostrarSuscripcion] = useState(false);

  const anuncios: Anuncio[] = [
    {
      id: 1,
      titulo: "Gran Feria a \"La Preciosa Sangre de Cristo\" Patria Nueva 2025",
      resumen: "¡La fiesta más grande del año! Tradición que late con fuerza en el corazón del Mezquital.",
      fecha: "1 de Julio, 2025",
      categoria: "Feria Patronal",
      imagen: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800",
      contenidoCompleto: "¡La fiesta más grande del año! Tradición que late con fuerza: coronación de la reina, bailes populares y ambiente familiar en el corazón del Mezquital. ¡Nos vemos en la feria!",
      detalles: [
        "Ubicación: Centro de Patria Nueva, Santiago de Anaya, Hidalgo",
        "Coronación de la reina de la feria",
        "Bailes populares y música en vivo",
        "Juegos mecánicos para toda la familia",
        "Charreadas y jaripeo nocturno",
        "Espectáculos de fuegos artificiales",
        "Ambiente familiar y comunitario"
      ]
    }
  ];

  const abrirModal = (anuncio: Anuncio) => {
    setAnuncioSeleccionado(anuncio);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setAnuncioSeleccionado(null);
  };

  const manejarSuscripcion = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSuscripcion.trim()) {
      // Aquí iría la lógica para suscribir el email
      console.log('Email suscrito:', emailSuscripcion);
      setSuscripcionExitosa(true);
      setEmailSuscripcion('');
      setTimeout(() => {
        setSuscripcionExitosa(false);
        setMostrarSuscripcion(false);
      }, 3000);
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'Feria Patronal': return 'bg-terracota';
      case 'Gobierno': return 'bg-olive-green';
      case 'Educación': return 'bg-sky-blue';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-cream to-white bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Bell className="text-terracota" size={48} />
          </div>
          <h2 className="text-5xl font-bold text-olive-green mb-6">Anuncios Importantes</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Mantente informado sobre las noticias y desarrollos más importantes de nuestra comunidad.
          </p>
          
          {/* Botón de suscripción */}
          <button
            onClick={() => setMostrarSuscripcion(!mostrarSuscripcion)}
            className="bg-sky-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 mx-auto transition-colors duration-300"
          >
            <Mail size={20} />
            <span>Suscríbete a Notificaciones</span>
          </button>
        </div>

        {/* Formulario de suscripción */}
        {mostrarSuscripcion && (
          <div className="max-w-md mx-auto mb-12 bg-white bg-opacity-95 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-olive-green mb-4 text-center">
              Recibe Notificaciones Gratuitas
            </h3>
            <p className="text-gray-600 text-sm mb-4 text-center">
              Te enviaremos un email cada vez que publiquemos un nuevo anuncio importante.
            </p>
            
            {suscripcionExitosa ? (
              <div className="text-center">
                <CheckCircle className="text-green-500 mx-auto mb-2" size={32} />
                <p className="text-green-600 font-semibold">¡Suscripción exitosa!</p>
                <p className="text-gray-600 text-sm">Recibirás notificaciones en tu email.</p>
              </div>
            ) : (
              <form onSubmit={manejarSuscripcion} className="space-y-4">
                <input
                  type="email"
                  value={emailSuscripcion}
                  onChange={(e) => setEmailSuscripcion(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full p-3 border-2 border-sky-blue rounded-lg focus:outline-none focus:border-terracota transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-terracota hover:bg-opacity-90 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Suscribirse Gratis
                </button>
              </form>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {anuncios.map((anuncio) => (
            <div key={anuncio.id} className="bg-white bg-opacity-95 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48">
                <img 
                  src={anuncio.imagen} 
                  alt={anuncio.titulo}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 left-4 ${getCategoriaColor(anuncio.categoria)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {anuncio.categoria}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={16} className="mr-2" />
                  {anuncio.fecha}
                </div>
                
                <h3 className="text-xl font-bold text-olive-green mb-3 line-clamp-2">
                  {anuncio.titulo}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {anuncio.resumen}
                </p>
                
                <button
                  onClick={() => abrirModal(anuncio)}
                  className="w-full bg-terracota hover:bg-opacity-90 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-300"
                >
                  <Info size={18} />
                  <span>Más Información</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalAbierto && anuncioSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img 
                  src={anuncioSeleccionado.imagen} 
                  alt={anuncioSeleccionado.titulo}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={cerrarModal}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <X size={20} />
                </button>
                <div className={`absolute bottom-4 left-4 ${getCategoriaColor(anuncioSeleccionado.categoria)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {anuncioSeleccionado.categoria}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar size={16} className="mr-2" />
                  {anuncioSeleccionado.fecha}
                </div>
                
                <h2 className="text-3xl font-bold text-olive-green mb-6">
                  {anuncioSeleccionado.titulo}
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {anuncioSeleccionado.contenidoCompleto}
                </p>
                
                {anuncioSeleccionado.detalles && (
                  <div className="bg-cream bg-opacity-80 rounded-lg p-6">
                    <h3 className="font-bold text-olive-green mb-4">Detalles Importantes:</h3>
                    <ul className="space-y-2">
                      {anuncioSeleccionado.detalles.map((detalle, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-terracota rounded-full mr-3"></div>
                          {detalle}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-end mt-8">
                  <button
                    onClick={cerrarModal}
                    className="bg-olive-green hover:bg-opacity-90 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Anuncios;