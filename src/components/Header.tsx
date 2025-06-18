import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Historia', href: '#historia' },
    { name: 'Anuncios Importantes', href: '#anuncios' },
    { name: 'Eventos', href: '#eventos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Traductor', href: '#traductor' },
    { name: 'Contáctanos', href: '#contacto' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-olive-green/90 to-sky-blue/90 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-r from-olive-green/70 to-sky-blue/70 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-terracota rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">PN</span>
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">Patria Nueva</h1>
              <p className="text-sky-blue text-sm">Santiago de Anaya, Hidalgo</p>
            </div>
          </div>

          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-sky-blue transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-gradient-to-b from-olive-green to-sky-blue bg-opacity-95 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
            <button
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={28} />
            </button>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white text-xl font-medium hover:text-terracota transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
