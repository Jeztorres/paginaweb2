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

  const scrollToSection = (href: string) => {
    if (typeof href === 'string' && href.trim() !== '') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-emerald-700/90 to-blue-800/90 backdrop-blur-md shadow-lg' // Colores más vibrantes y oscuros al hacer scroll
          : 'bg-gradient-to-r from-emerald-600/70 to-blue-700/70 backdrop-blur-md' // Colores originales, un poco más claros
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo y nombre del sitio */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center"> {/* Color terracota más distintivo */}
              <span className="text-white font-bold text-xl">PN</span>
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">Patria Nueva</h1>
              <p className="text-blue-300 text-sm">Santiago de Anaya, Hidalgo</p> {/* Azul más claro para la sub-etiqueta */}
            </div>
          </div>

          {/* Navegación para pantallas grandes */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-blue-300 transition-colors duration-300 font-medium px-3 py-2 rounded-md" // Añadimos rounded-md para un toque suave
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Botón de menú para dispositivos móviles */}
          <button
            className="lg:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-white rounded-md" // Añadimos focus styles
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={28} aria-label="Cerrar menú" /> : <Menu size={28} aria-label="Abrir menú" />}
          </button>
        </div>

        {/* Menú móvil (condicional) */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden fixed inset-0 min-h-screen bg-gradient-to-b from-emerald-800 to-blue-900 bg-opacity-95 backdrop-blur-lg flex flex-col items-center justify-center space-y-8 p-6 animate-slide-in-right" // Más espacio y animación
          >
            <button
              className="absolute top-6 right-6 text-white p-2 focus:outline-none focus:ring-2 focus:ring-white rounded-md" // Mejor posicionamiento y focus styles
              onClick={() => setIsMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <X size={32} /> {/* Icono un poco más grande */}
            </button>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white text-2xl font-semibold hover:text-red-400 transition-colors duration-300 py-3 w-full text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" // Tamaño de texto más grande, negrita, padding y focus styles
              >
                {item.name}
              </button>
            ))}
            {/* Opcional: Separador visual o línea */}
            <div className="w-2/3 h-px bg-white/30 my-4"></div>
            <p className="text-white/70 text-sm mt-4">Patria Nueva © 2025</p> {/* Información adicional */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
