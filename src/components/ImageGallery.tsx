import React from 'react';

interface ImageGalleryProps {
  images: string[];
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className }) => (
  <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ${className ?? ''}`}>  
    {images.map((src, i) => (
      <img
        key={i}
        src={src}
        alt={`Galería imagen ${i + 1}`}
        className="w-full h-auto object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
      />
    ))}
  </div>
);

export default ImageGallery;
