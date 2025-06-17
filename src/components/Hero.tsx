import React from 'react';
import { ArrowRight, Calendar, BookOpen } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-olive-green to-sky-blue min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Bienvenidos a
            <br />
            <span className="text-terracota">Patria Nueva</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-cream font-light mb-12 max-w-4xl mx-auto leading-relaxed">
            "Un hermoso pueblo en el corazón de Hidalgo, donde la tradición y la modernidad se encuentran."
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => scrollToSection('#historia')}
              className="bg-terracota hover:bg-opacity-90 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <BookOpen size={24} />
              <span>Nuestra Historia</span>
              <ArrowRight size={20} />
            </button>
            
            <button
              onClick={() => scrollToSection('#eventos')}
              className="bg-sky-blue hover:bg-opacity-90 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Calendar size={24} />
              <span>Próximos Eventos</span>
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Tradición</h3>
              <p className="text-cream">Preservamos nuestras raíces y costumbres ancestrales</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Comunidad</h3>
              <p className="text-cream">Unidos como una gran familia hidalguense</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Progreso</h3>
              <p className="text-cream">Avanzamos hacia un futuro próspero</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;