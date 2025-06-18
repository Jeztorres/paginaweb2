import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

/**
 * Carrusel de imágenes con:
 * - Rotación automática (4 s)
 * - Controles manuales (anterior / siguiente)
 * - Indicadores (puntos) clicables
 */
const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className }) => {
  const [index, setIndex] = useState(0);

  /* --------------------------- Rotación automática --------------------------- */
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  /* ------------------------------- Render ------------------------------- */
  if (images.length === 0) return null;

  const goToPrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${
        className ?? ''
      }`.trim()}
    >
      {/* Imágenes */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Imagen carrusel ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Controles */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 p-2 rounded-full text-white transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 p-2 rounded-full text-white transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicadores */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? 'bg-white' : 'bg-gray-300'
              }`}
              aria-label={`Ir a la imagen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;

