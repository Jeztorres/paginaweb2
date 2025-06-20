import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Calendar,
  Info,
  Mail,
  CheckCircle,
} from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { jsPDF } from 'jspdf';

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

  const [emailSuscripcion, setEmailSuscripcion] = useState('');
  const [suscripcionExitosa, setSuscripcionExitosa] = useState(false);
  const [mostrarSuscripcion, setMostrarSuscripcion] = useState(false);
  // Ref para el formulario de suscripción y scroll automático en móvil
  const formRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mostrarSuscripcion && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [mostrarSuscripcion]);

  // Función para generar y descargar un PDF con todas las imágenes de un anuncio
  const handleDescargar = async (imagenes: string[]) => {
    const doc = new jsPDF();
    for (let i = 0; i < imagenes.length; i++) {
      const imgUrl = imagenes[i];
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imgUrl;
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.drawImage(img, 0, 0);
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const imgProps = (doc as any).getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      if (i < imagenes.length - 1) doc.addPage();
    }
    doc.save('anuncio_imagenes.pdf');
  };

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
  // ya no usamos modal, ahora descargamos directamente

  // Suscripción
  const manejarSuscripcion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailSuscripcion.trim()) return;

    try {
      // Prioritize VITE_API_URL if available, otherwise default to an empty string
      const base = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${base}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailSuscripcion }),
      });
      if (!res.ok) throw new Error('Error');

      setSuscripcionExitosa(true);
      setEmailSuscripcion('');
    } catch (error) {
      console.error('Error al suscribirse:', error);
      // Optionally, set an error status for the UI
      // setSuscripcionExitosa(false);
      // setMostrarSuscripcion(true); // Keep form open to show error
    }

    setTimeout(() => {
      setSuscripcionExitosa(false);
      setMostrarSuscripcion(false);
    }, 3000);
  };

  // Colores por categoría
  const getCategoriaColor = (categoria: string) => {
    const colores: Record<string, string> = {
      'Feria Patronal': 'bg-terracota/80', // Terracota con 80% de opacidad
      'Gobierno': 'bg-olive-green',
      'Educación': 'bg-sky-blue',
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
          <div ref={formRef} className="max-w-md mx-auto mb-12 bg-white/95 rounded-2xl p-6 shadow-lg">
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
                  onClick={() =>
                    handleDescargar(anuncio.imagenes ?? [anuncio.imagen])
                  }
                  className="w-full bg-terracota hover:bg-opacity-90 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-300"
                >
                  <Info size={18} />
                  <span>Descarga programas y eventos</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Anuncios;