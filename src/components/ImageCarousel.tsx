import React, { useEffect, useState, useRef } from 'react';

interface ImageCarouselProps {
  images: string[];
  className?: string;
  imgClassName?: string;
  onImageClick?: (index: number) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className, imgClassName, onImageClick }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images, paused]);

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

  if (images.length === 0) return null;

  return (
    <div
      className={`group relative overflow-hidden ${className ?? ''}`}
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
          onClick={() => {
            if (onImageClick) onImageClick(i);
          }}
          style={{ cursor: 'pointer' }}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
