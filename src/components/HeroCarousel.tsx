import React from 'react';
import ImageCarousel from './ImageCarousel';

// Import all images from the hero-carousel assets folder
const images = Object.values(
  import.meta.glob('../assets/hero-carousel/*.{jpg,jpeg,png,webp}', {
    eager: true,
    as: 'url'
  })
) as string[];

const HeroCarousel = () => {
  if (images.length === 0) return null;

  return (
    <ImageCarousel images={images} className="w-full h-64 md:h-96 shadow-lg" />
  );
};

export default HeroCarousel;
