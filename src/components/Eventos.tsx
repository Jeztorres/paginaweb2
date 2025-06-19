import React, { useState, useEffect } from 'react';
import { Calendar, Music, X } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface Evento {
  id: number;
  nombre: string;
  fecha: string;
  descripcion: string;
  imagen: string;
  imagenes?: string[];
  ubicacion: string;
  hora: string;
}

const Eventos = () => {
  const ref = useScrollAnimation<HTMLDivElement>();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null);
  const [modalOffset, setModalOffset] = useState(0);

  const eventImagesMap: Record<number, string[]> = {};
  const imgs = import.meta.glob('../assets/eventos-carousel/evento*/*.{jpg,jpeg,png,webp}', {
    eager: true,
    as: 'url'
  });
  for (const path in imgs) {
    const match = path.match(/eventos-carousel\/evento(\d+)\//);
    if (match) {
      const id = Number(match[1]);
      (eventImagesMap[id] ??= []).push(imgs[path] as string);
    }
  }
  const eventos: Evento[] = [
    {
      id: 1,
      nombre: "Fiesta de la Santa Cruz",
      fecha: "3 de Mayo",
      descripcion: "Celebración en el cerro Xitphe con bendición de cruces, danzas autóctonas y un ambiente de fe y tradición que une a la comunidad.",
      imagen: eventImagesMap[1]?.[0] || "",
      imagenes: eventImagesMap[1],
      ubicacion: "Cerro Xitphe",
      hora: "Todo el día"
    },
    {
      id: 2,
      nombre: "Conmemoración Ejidal",
      fecha: "15 de Mayo",
      descripcion: "Desfile de tractores, música de banda y actos cívicos para recordar la entrega de parcelas de 1925; encuentro fraterno entre ejidatarios y familias.",
      imagen: eventImagesMap[2]?.[0] || "",
      imagenes: eventImagesMap[2],
      ubicacion: "Centro de Patria Nueva",
      hora: "9:00 AM - 6:00 PM"
    },
    {
      id: 3,
      nombre: "Feria a \"La Preciosa Sangre de Cristo\"",
      fecha: "1 de Julio",
      descripcion: "Feria patronal con charreadas, jaripeo nocturno, juegos mecánicos, bailes populares y espectáculos de fuegos artificiales. Diversión familiar asegurada.",
      imagen: eventImagesMap[3]?.[0] || "",
      imagenes: eventImagesMap[3],
      ubicacion: "Centro de Patria Nueva",
      hora: "Todo el día"
    },
    {
      id: 4,
      nombre: "Grito de Independencia",
      fecha: "15 de Septiembre",
      descripcion: "Verbena cívica con música, luces y pirotecnia que enciende el orgullo patrio y fortalece el sentido de comunidad.",
      imagen: eventImagesMap[4]?.[0] || "",
      imagenes: eventImagesMap[4],
      ubicacion: "Plaza Principal",
      hora: "7:00 PM - 12:00 AM"
    },
    {
      id: 5,
      nombre: "Día de Muertos",
      fecha: "1 y 2 de Noviembre",
      descripcion: "Ofrendas, altares y visita a los panteones para honrar a nuestros seres queridos.",
      imagen: eventImagesMap[5]?.[0] || "",
      imagenes: eventImagesMap[5],
      ubicacion: "Panteón y hogares",
      hora: "Todo el día"
    },
    {
      id: 6,
      nombre: "Encendido del Árbol",
      fecha: "Principios de Diciembre",
      descripcion: "Arranque oficial de la temporada navideña con luces, villancicos y un ambiente familiar que ilumina todo el corazón de Patria Nueva.",
      imagen: eventImagesMap[6]?.[0] || "",
      imagenes: eventImagesMap[6],
      ubicacion: "Plaza Principal",
      hora: "6:00 PM - 9:00 PM"
    },
    {
      id: 7,
      nombre: "Feria a \"La Virgen María de Guadalupe\"",
      fecha: "10-12 de Diciembre",
      descripcion: "Festejo guadalupano con misas solemnes, danzas populares y espectáculos artísticos que reafirman nuestra fe y cultura.",
      imagen: eventImagesMap[7]?.[0] || "",
      imagenes: eventImagesMap[7],
      ubicacion: "Iglesia y Plaza",
      hora: "Variable"
    }
  ];

  const abrirModal = (evento: Evento, offset: number) => {
    setEventoSeleccionado(evento);
    setModalOffset(offset);
    setModalAbierto(true);
  };

const cerrarModal = () => {
  setModalAbierto(false);
  setEventoSeleccionado(null);
};

  // Cerrar el modal cuando el usuario hace scroll
  useEffect(() => {
    if (!modalAbierto) return;
    const handleScroll = () => cerrarModal();
    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [modalAbierto]);

  return (
    <div ref={ref} className="scroll-animation py-20 bg-olive-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Music className="text-terracota" size={48} />
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">Fiestas y Tradiciones</h2>
          <p className="text-xl text-cream max-w-4xl mx-auto leading-relaxed">
            Sumérgete en la riqueza cultural de Patria Nueva a través de nuestras celebraciones más emblemáticas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              onClick={(e) =>
                abrirModal(
                  evento,
                  (e.currentTarget as HTMLElement).getBoundingClientRect().top
                )
              }
              className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img
                  src={evento.imagen}
                  alt={evento.nombre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-terracota text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {evento.fecha}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-olive-green mb-3">
                  {evento.nombre}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {evento.descripcion}
                </p>
                
                {/* Se omite ubicación y horario según solicitud */}
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Tradición Comunitaria</span>
                    <Calendar size={16} className="text-sky-blue" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {modalAbierto && eventoSeleccionado && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50"
            style={{ paddingTop: modalOffset }}
          >
            <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl max-w-2xl w-full">
              <div className="relative">
                <button
                  onClick={cerrarModal}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 pt-12">
                <h2 className="text-2xl font-bold text-olive-green mb-4 text-center">
                  {eventoSeleccionado.nombre}
                </h2>
                <img
                  src={(eventoSeleccionado.imagenes && eventoSeleccionado.imagenes[0]) || eventoSeleccionado.imagen}
                  alt={eventoSeleccionado.nombre}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">¡Participa en Nuestras Tradiciones!</h3>
          <p className="text-cream text-lg mb-6 max-w-3xl mx-auto">
            Cada evento es una oportunidad de fortalecer los lazos comunitarios y mantener vivas nuestras tradiciones. 
            Todos los vecinos y visitantes son bienvenidos a participar en estas celebraciones.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-terracota px-4 py-2 rounded-full text-white font-semibold">
              Tradiciones Ancestrales
            </div>
            <div className="bg-sky-blue px-4 py-2 rounded-full text-white font-semibold">
              Eventos Familiares
            </div>
            <div className="bg-cream px-4 py-2 rounded-full text-olive-green font-semibold">
              Cultura Viva
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventos;
