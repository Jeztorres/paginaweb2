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
    <div className={`overflow-hidden rounded-2xl ${className ?? ''}`.trim()}>
      <img
        src={images[index]}
        alt={`Imagen carrusel ${index + 1}`}
        className="w-full h-full object-cover transition-opacity duration-700"
      />
    </div>
  );
};

export default ImageCarousel;
