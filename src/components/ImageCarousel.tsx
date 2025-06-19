import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { X } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  className?: string;
  imgClassName?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className, imgClassName }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Si solo hay una imagen o está pendiente de pausa, no rotar
    if (images.length <= 1 || paused) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Rotate every 4 seconds
    return () => clearInterval(id); // Clean up on component unmount
  }, [images, paused]); // Re-run effect if images array or pause state changes

  // Cerrar modal si se hace scroll fuera de la sección del carrusel
  useEffect(() => {
    if (!modalOpen) return;
    const handleScroll = () => {
      if (!modalRef.current) return;
      const rect = modalRef.current.getBoundingClientRect();
      // Si el modal está fuera de la pantalla (por scroll), ciérralo
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setModalOpen(false);
        setPaused(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [modalOpen]);

  // Don't render if no images are provided
  if (images.length === 0) return null;

  // Functions for manual navigation
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <>
      <div
        className={`group relative flex items-center justify-center bg-transparent shadow-none ${className ?? ''}`.trim()}
      >
        {/* Imágenes */}
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Imagen carrusel ${i + 1}`}
            className={`absolute inset-0 w-full h-full ${imgClassName ?? 'object-cover'} transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => { setPaused(true); setModalIndex(i); setModalOpen(true); }}
            style={{ cursor: 'pointer' }}
          />
        ))}

        {/* Discrete arrows for navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Anterior"
              className="opacity-0 group-hover:opacity-70 transition-opacity absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-1.5 rounded-full text-white z-10" // Added z-10 for better layering
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              className="opacity-0 group-hover:opacity-70 transition-opacity absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-1.5 rounded-full text-white z-10" // Added z-10
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Discrete indicators (dots) */}
        {images.length > 1 && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10"> {/* Added z-10 */}
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir a la imagen ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? 'bg-white/80' : 'bg-white/40'
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>

      {/* Modal de imagen ampliada */}
      {modalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75"
        >
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Botones de navegación fuera de la imagen pero cerca */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setModalIndex((modalIndex - 1 + images.length) % images.length)}
                  className="absolute left-1/2 -translate-x-[calc(50%+320px)] top-1/2 -translate-y-1/2 bg-black bg-opacity-60 rounded-full p-3 text-white z-20 hover:bg-opacity-80 focus:outline-none"
                  style={{ minWidth: '40px', minHeight: '40px', border: 'none', outline: 'none', cursor: 'pointer' }}
                >
                  &#8592;
                </button>
                <button
                  onClick={() => setModalIndex((modalIndex + 1) % images.length)}
                  className="absolute left-1/2 translate-x-[calc(50%+320px)] top-1/2 -translate-y-1/2 bg-black bg-opacity-60 rounded-full p-3 text-white z-20 hover:bg-opacity-80 focus:outline-none"
                  style={{ minWidth: '40px', minHeight: '40px', border: 'none', outline: 'none', cursor: 'pointer' }}
                >
                  &#8594;
                </button>
              </>
            )}
            <div className="relative inline-block">
              <img
                src={images[modalIndex]}
                alt={`Imagen ampliada ${modalIndex + 1}`}
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg mx-auto my-auto shadow-lg"
              />
              <button
                onClick={() => { setModalOpen(false); setPaused(false); }}
                className="absolute top-2 right-2 z-10 bg-black bg-opacity-60 rounded-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
                style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
              >
                <X size={28} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;