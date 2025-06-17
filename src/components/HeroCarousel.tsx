import React, { useEffect, useState } from 'react';

// Import all images from the hero-carousel assets folder
const images = Object.values(
  import.meta.glob('../assets/hero-carousel/*.{jpg,jpeg,png,webp}', {
    eager: true,
    as: 'url'
  })
) as string[];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="w-full h-64 md:h-96 overflow-hidden rounded-2xl shadow-lg">
      <img
        src={images[index]}
        alt={`Imagen carrusel ${index + 1}`}
        className="w-full h-full object-cover transition-opacity duration-700"
      />
    </div>
  );
};

export default HeroCarousel;
