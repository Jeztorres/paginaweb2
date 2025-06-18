import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  className?: string;
  imgClassName?: string;
}

/**
 * Carrusel con rotación automática + controles discretos.
 * - Flechas: solo se muestran cuando se pasa el cursor (group-hover).
 * - Puntos indicadores: 6px, baja opacidad.
 */
const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className, imgClassName }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // If there's only one image, disable auto-rotation
    if (images.length <= 1) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Rotate every 4 seconds
    return () => clearInterval(id); // Clean up on component unmount
  }, [images]); // Re-run effect if images array changes

  // Don't render if no images are provided
  if (images.length === 0) return null;

  // Functions for manual navigation
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div
      className={`group relative flex items-center justify-center bg-transparent shadow-none ${className ?? ''}`.trim()}
    >
      {/* Images */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Imagen carrusel ${i + 1}`}
          // The key correction: Use imgClassName if provided, otherwise default to 'object-cover'
          className={`absolute inset-0 w-full h-full ${imgClassName ?? 'object-cover'} transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
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
  );
};

export default ImageCarousel;
