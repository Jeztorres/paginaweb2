import React, { useState, useEffect } from 'react';
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
  const [modalOffset, setModalOffset] = useState(0);
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
  ];

  // Funciones de UI
  const abrirModal = (anuncio: Anuncio, offset: number) => {
    setAnuncioSeleccionado(anuncio);
    setModalOffset(offset);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setAnuncioSeleccionado(null);
  };

  // Cerrar el modal al llegar a la siguiente sección desplazándose hacia abajo
  useEffect(() => {
    if (!modalAbierto) return;
    const nextEl = document.querySelector<HTMLElement>('#eventos');
    if (!nextEl) return;
    const nextTop = nextEl.offsetTop;
    let prevY = window.scrollY;

    const handleScroll = () => {
      const currY = window.scrollY;
      if (currY > prevY && currY + window.innerHeight >= nextTop) {
        cerrarModal();
        window.removeEventListener('scroll', handleScroll);
      }
      prevY = currY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [modalAbierto]);

  // Suscripción
  const manejarSuscripcion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailSuscripcion.trim()) return;

    try {
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
    }

    setTimeout(() => {
      setSuscripcionExitosa(false);
      setMostrarSuscripcion(false);
    }, 3000);
  };

  // Colores por categoría
  const getCategoriaColor = (categoria: string) => {
    const colores: Record<string, string> = {
      'Feria Patronal': 'bg-terracota/80',
      'Gobierno': 'bg-olive-green',
      'Educación': 'bg-sky-blue',
    };
    return colores[categoria] ?? 'bg-gray-500/60';
  };

  return (
    <div ref={ref} className="scroll-animation py-20 bg-gradient-to-br from-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        {/* ... (continúa igual hasta el final del componente) */}
        {/* OMITIDO AQUÍ para brevedad ya que tu código ya estaba correcto en su mayoría */}
      </div>
    </div>
  );
};

export default Anuncios;

