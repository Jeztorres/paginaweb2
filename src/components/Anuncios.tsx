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
      resumen: '',
      fecha: '1 de Julio, 2025',
      categoria: 'Feria Patronal',
      imagen: anuncio1Portada[0] || anuncio1Images[0] || '',
      imagenes: anuncio1Images,
      contenidoCompleto: '',
    },
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
  const manejarSuscripcion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailSuscripcion.trim()) return;

    console.log('Email suscrito:', emailSuscripcion);
    setSuscripcionExitosa(true);
    setEmailSuscripcion('');

    setTimeout(() => {
      setSuscripcionExitosa(false);
      setMostrarSuscripcion(false);
    }, 3000);
  };

  // Colores por categoría
  const getCategoriaColor = (categoria: string) => {
    const colores: Record<string, string> = {
      'Feria Patronal': 'bg-terracota',
      Gobierno: 'bg-olive-green',
      Educación: 'bg-sky-blue',
    };
    return colores[categoria] ?? 'bg-gray-500';
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
              className="rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-md mx-auto"
            >
              <div className="relative h-64 flex items-center justify-center">
                <img src={anuncio.imagen} alt={anuncio.titulo} className="w-full h-full object-cover" />
                <div
                  className={`absolute top-4 left-4 ${getCategoriaColor(
                    anuncio.categoria
                  )} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                >
                  {anuncio.categoria}
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={16} className="mr-2" />
                  {anuncio.fecha}
                </div>
                <h3 className="text-xl font-bold text-olive-green mb-3 line-clamp-2">
                  {anuncio.titulo}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{anuncio.resumen}</p>
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

        {/* Modal */}
        {modalAbierto && anuncioSeleccionado && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black bg-opacity-50"> {/* Added overlay */}
            <div className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white relative"> {/* Added bg-white and relative */}
              <button
                onClick={cerrarModal}
                className="absolute top-4 right-4 bg-black text-white p-2 rounded-full hover:bg-opacity-70 transition-colors z-10" // Added z-10
              >
                <X size={20} />
              </button>
              <ImageCarousel
                images={anuncioSeleccionado.imagenes ?? [anuncioSeleccionado.imagen]}
                className="w-full max-h-[80vh]"
                imgClassName="object-contain" // Kept this from the branch
              />
              {/* Removed the category badge inside the modal's image carousel section */}
              <div className="p-6 text-center"> {/* Removed bg-white as it's now on the parent div */}
                <h3 className="text-2xl font-bold text-olive-green">
                  {anuncioSeleccionado.titulo}
                </h3>
                {anuncioSeleccionado.contenidoCompleto && (
                  <p className="mt-4 text-gray-700 text-left whitespace-pre-line">
                    {anuncioSeleccionado.contenidoCompleto}
                  </p>
                )}
                {anuncioSeleccionado.detalles && anuncioSeleccionado.detalles.length > 0 && (
                  <ul className="mt-4 text-left list-disc list-inside text-gray-700">
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