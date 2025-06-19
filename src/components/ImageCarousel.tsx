import React, { useEffect, useState, useRef } from 'react';
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
  const touchStartX = useRef<number | null>(null);
  const modalTouchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50;
    if (deltaX > threshold) {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (deltaX < -threshold) {
      setIndex((prev) => (prev + 1) % images.length);
    }
    touchStartX.current = null;
  };

  const handleModalTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    modalTouchStartX.current = e.touches[0].clientX;
  };

  const handleModalTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (modalTouchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - modalTouchStartX.current;
    const threshold = 50;
    if (deltaX > threshold) {
      setModalIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (deltaX < -threshold) {
      setModalIndex((prev) => (prev + 1) % images.length);
    }
    modalTouchStartX.current = null;
  };

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

  return (
    <>
      <div
        className={`group relative flex items-center justify-center bg-transparent shadow-none ${className ?? ''}`.trim()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Imagen carrusel ${i + 1}`}
            className={`absolute inset-0 w-full h-full ${imgClassName ?? 'object-cover'} transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => { setModalIndex(i); setPaused(true); setModalOpen(true); }}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
      {modalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75"
        >
          <div
            className="relative inline-block"
            onTouchStart={handleModalTouchStart}
            onTouchEnd={handleModalTouchEnd}
          >
            <img
              src={images[modalIndex]}
              alt={`Imagen ampliada ${modalIndex + 1}`}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg mx-auto my-auto shadow-lg"
            />
            <button
              onClick={() => { setModalOpen(false); setPaused(false); }}
              className="absolute top-2 right-2 z-10 bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/70"
              style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
            >
              <X size={28} />
            </button>
            {/* Botones de navegación ajustados cerca de la imagen */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setModalIndex((modalIndex - 1 + images.length) % images.length)}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-2 sm:p-3 text-white z-10 hover:bg-white/30 focus:outline-none"
                  style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
                >
                  &#8592;
                </button>
                <button
                  onClick={() => setModalIndex((modalIndex + 1) % images.length)}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-2 sm:p-3 text-white z-10 hover:bg-white/30 focus:outline-none"
                  style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
                >
                  &#8594;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;
