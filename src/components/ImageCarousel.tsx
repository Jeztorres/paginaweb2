import React, { useEffect, useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className ?? ''}`.trim()}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Imagen carrusel ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
