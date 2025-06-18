import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  Info,
  X,
  Mail,
  CheckCircle,
} from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface Anuncio {
  id: number;
  titulo: string;
  resumen: string;
  fecha: string;
  categoria: string;
  imagen: string;
  imagenes?: string[];
  contenidoCompleto: string;
  detalles?: string[];
}

const Anuncios: React.FC = () => {
  const ref = useScrollAnimation<HTMLDivElement>();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [anuncioSeleccionado, setAnuncioSeleccionado] = useState<Anuncio | null>(null);
  const [emailSuscripcion, setEmailSuscripcion] = useState('');
  const [suscripcionExitosa, setSuscripcionExitosa] = useState(false);
  const [mostrarSuscripcion, setMostrarSuscripcion] = useState(false);

  // Carga de imágenes
  const anuncio1Images = Object.values(
    import.meta.glob('../assets/anuncios-carousel/anuncio1/*.{jpg,jpeg,png,webp}', {
      eager: true,
      as: 'url',
    })
  ) as string[];

  const anuncio1Portada = Object.values(
    import.meta.glob('../assets/anuncios-portada/feria-preciosa-sangre/*.{jpg,jpeg,png,webp}', {
      eager: true,
      as: 'url',
    })
  ) as string[];

  // Datos de ejemplo
  const anuncios: Anuncio[] = [
    {
      id: 1,
      titulo: 'Gran Feria a "La Preciosa Sangre de Cristo" Patria Nueva 2025',
      resumen: 'Únete a nosotros para celebrar la Gran Feria a "La Preciosa Sangre de Cristo" en Patria Nueva 2025. Disfruta de actividades culturales, gastronomía local y eventos para toda la familia.',
      fecha: '1 de Julio, 2025',
      categoria: 'Feria Patronal',
      imagen: anuncio1Portada[0] || anuncio1Images[0] || '',
      imagenes: anuncio1Images,
      contenidoCompleto: '',
      detalles: [],
    },
    // You can add more announcements here
  ];

  // Funciones de UI
  const abrirModal = (anuncio: Anuncio) => {
    setAnuncioSeleccionado(anuncio);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setAnuncioSeleccionado(null);
  };

  // Suscripción
  const manejarSuscripcion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailSuscripcion.trim()) return;

    try {
      const res = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailSuscripcion }),
      });
      if (!res.ok) throw new Error('Error');

      setSuscripcionExitosa(true);
      setEmailSuscripcion('');
    } catch (error) {
      console.error('Error al suscribirse:', error);
    }

    setTimeout(() => {
      setSuscripcionExitosa(false);
      setMostrarSuscripcion(false);
    }, 3000);
  };

  // Colores por categoría
  const getCategoriaColor = (categoria: string) => {
    const colores: Record<string, string> = {
      // MODIFICACIÓN: Cambiado a 'bg-terracota/80' para el color naranja con opacidad
      'Feria Patronal': 'bg-terracota/80', // Terracota con 80% de opacidad
      Gobierno: 'bg-olive-green',
      Educación: 'bg-sky-blue',
    };
    // Mantenemos un color gris con opacidad para categorías no definidas si es necesario
    return colores[categoria] ?? 'bg-gray-500/60';
  };

  return (
    <div ref={ref} className="scroll-animation py-20 bg-gradient-to-br from-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Bell className="text-terracota" size={48} />
          </div>
          <h2 className="text-5xl font-bold text-olive-green mb-6">Anuncios Importantes</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Mantente informado sobre las noticias y desarrollos más importantes de nuestra comunidad.
          </p>
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
          <div className="max-w-md mx-auto mb-12 bg-white/95 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-olive-green mb-4 text-center">Recibe Notificaciones Gratuitas</h3>
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

        {/* Cards de anuncios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {anuncios.map((anuncio) => (
            <div
              key={anuncio.id}
              className="rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-md mx-auto bg-white"
            >
              <div className="relative h-64 flex items-center justify-center">
                <img src={anuncio.imagen} alt={anuncio.titulo} className="w-full h-full object-cover" />
                {/* Cuadro de categoría en la tarjeta - APLICACIÓN DEL CAMBIO AQUÍ */}
                <div
                  className={`absolute top-4 left-4 ${getCategoriaColor(
                    anuncio.categoria
                  )} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                >
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
                  {anuncio.resumen || 'Haz clic para ver más detalles sobre este anuncio.'}
                </p>
                <button
                  onClick={() => abrirModal(anuncio)}
                  className="w-full bg-terracota hover:bg-opacity-90 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-300"
                >
                  <Info size={18} />
                  <span>Conoce el programa y los eventos</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Anuncio */}
        {modalAbierto && anuncioSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            {/* Fondo general del modal (verde transparente) */}
            <div className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-olive-green/20 relative shadow-2xl backdrop-blur-sm">
              {/* Close Button */}
              <button
                onClick={cerrarModal}
                className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-20"
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>

              {/* Image Carousel - ajustando la altura para que la imagen se estire más */}
              <ImageCarousel
                images={anuncioSeleccionado.imagenes ?? [anuncioSeleccionado.imagen]}
                className="w-full h-[400px]" // Altura fija para el carrusel
                imgClassName="object-contain"
              />

              {/* Contenido del anuncio dentro del modal con fondo verde transparente y TEXTO CLARO */}
              <div className="p-6 text-center bg-olive-green/20">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {anuncioSeleccionado.titulo}
                </h3>
                {/* Cuadro de categoría en el modal - APLICACIÓN DEL CAMBIO AQUÍ */}
                <div className={`inline-block ${getCategoriaColor(anuncioSeleccionado.categoria)} text-white px-3 py-1 rounded-full text-sm font-semibold mb-4`}>
                  {anuncioSeleccionado.categoria}
                </div>
                <div className="flex items-center justify-center text-sm text-white mb-4">
                  <Calendar size={16} className="mr-2" />
                  {anuncioSeleccionado.fecha}
                </div>

                {anuncioSeleccionado.contenidoCompleto && (
                  <p className="mt-4 text-white text-left whitespace-pre-line leading-relaxed">
                    {anuncioSeleccionado.contenidoCompleto}
                  </p>
                )}

                {anuncioSeleccionado.detalles && anuncioSeleccionado.detalles.length > 0 && (
                  <ul className="mt-4 text-white text-left list-disc list-inside space-y-1">
                    {anuncioSeleccionado.detalles.map((detalle, index) => (
                      <li key={index}>{detalle}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Anuncios;