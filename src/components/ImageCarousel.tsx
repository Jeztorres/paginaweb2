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
  const [modalOffset, setModalOffset] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const modalTouchStartX = useRef<number | null>(null);

  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const showControls = () => {
    setControlsVisible(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setControlsVisible(false), 2000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    };
  }, []);

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
    if (modalOpen) {
      showControls();
    } else {
      setControlsVisible(true);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
        controlsTimeout.current = null;
      }
    }
  }, [modalOpen]);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images, paused]);

  // Keep the modal visible while the user scrolls by removing
  // the previous scroll listener that closed the modal when it
  // moved out of view. The modal uses fixed positioning, so it
  // naturally stays on screen and "follows" the user.

  if (images.length === 0) return null;

  return (
    <>
      <div
        className={`group relative flex items-center justify-center bg-transparent shadow-none ${className ?? ''}`}
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
            onClick={(e) => {
              const rect = (e.target as HTMLImageElement).getBoundingClientRect();
              setModalIndex(i);
              setModalOffset(rect.top);
              setPaused(true);
              setModalOpen(true);
            }}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {modalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-start justify-center z-50 bg-white/10 backdrop-blur-lg"
          style={{ paddingTop: modalOffset }}
          onMouseMove={showControls}
          onTouchStart={showControls}
        >
          <div
            className="relative inline-block"
            onTouchStart={(e) => {
              handleModalTouchStart(e);
              showControls();
            }}
            onTouchEnd={handleModalTouchEnd}
            onMouseMove={showControls}
          >
            <img
              src={images[modalIndex]}
              alt={`Imagen ampliada ${modalIndex + 1}`}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg mx-auto my-auto shadow-lg"
            />
            <button
              onClick={() => {
                setModalOpen(false);
                setPaused(false);
              }}
              className={`absolute top-2 right-2 z-10 bg-transparent backdrop-blur-md border border-white/40 rounded-full p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70 transition-opacity ${
                controlsVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <X size={28} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={() => {
                    setModalIndex((modalIndex - 1 + images.length) % images.length);
                    showControls();
                  }}
                  className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-transparent backdrop-blur-md border border-white/40 rounded-full p-2 sm:p-3 text-white z-10 hover:bg-white/20 focus:outline-none transition-opacity ${
                    controlsVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  &#8592;
                </button>
                <button
                  onClick={() => {
                    setModalIndex((modalIndex + 1) % images.length);
                    showControls();
                  }}
                  className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-transparent backdrop-blur-md border border-white/40 rounded-full p-2 sm:p-3 text-white z-10 hover:bg-white/20 focus:outline-none transition-opacity ${
                    controlsVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ cursor: 'pointer' }}
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
