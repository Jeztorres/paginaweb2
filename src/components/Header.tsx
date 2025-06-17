import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Historia', href: '#historia' },
    { name: 'Anuncios Importantes', href: '#anuncios' },
    { name: 'Eventos', href: '#eventos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Traductor', href: '#traductor' },
    { name: 'Contáctanos', href: '#contacto' },
  ];


  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
34h8r3-codex/añadir-carrusel-de-imágenes-y-eliminar-cuadro--patria-nueva
      className="sticky top-0 z-50 transition-all duration-300 bg-transparent backdrop-blur-md"

      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-olive-green bg-opacity-90 backdrop-blur-md shadow-lg'
          : 'bg-olive-green bg-opacity-50 backdrop-blur-md'
      }`}
      main
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-terracota rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">PN</span>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">Patria Nueva</h1>
              <p className="text-sky-blue text-sm">Santiago de Anaya, Hidalgo</p>
            </div>
          </div>

          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-olive-green bg-opacity-95 backdrop-blur-md border-t border-sky-blue border-opacity-30">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-terracota hover:bg-opacity-50 transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
