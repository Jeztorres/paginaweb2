import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Determina si la página se ha desplazado más de 50 píxeles.
      setIsScrolled(window.scrollY > 50);
    };

    // Agrega el event listener al montar el componente.
    window.addEventListener('scroll', handleScroll);
    // Limpia el event listener al desmontar el componente para evitar fugas de memoria.
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar y una al desmontar.

  // Definición de los ítems de navegación.
  const navItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Historia', href: '#historia' },
    { name: 'Anuncios Importantes', href: '#anuncios' },
    { name: 'Eventos', href: '#eventos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Traductor', href: '#traductor' },
    { name: 'Contáctanos', href: '#contacto' },
  ];

  /**
   * Desplaza la vista a la sección especificada por el href.
   * @param {string} href El selector CSS de la sección a la que se desea desplazar.
   */
  const scrollToSection = (href: string) => {
    // Verifica que el href sea una cadena y no esté vacío.
    if (typeof href === 'string' && href.trim() !== '') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Cierra el menú móvil después de hacer clic en un enlace.
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-olive-green/90 to-sky-blue/90 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-r from-olive-green/70 to-sky-blue/70 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo y nombre del sitio */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-terracota rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">PN</span>
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">Patria Nueva</h1>
              <p className="text-sky-blue text-sm">Santiago de Anaya, Hidalgo</p>
            </div>
          </div>

          {/* Navegación para pantallas grandes */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-sky-blue transition-colors duration-300 font-medium px-3 py-2"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Botón de menú para dispositivos móviles */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen} // Estado de accesibilidad: si el menú está expandido
            aria-controls="mobile-menu" // Accesibilidad: el ID del elemento que controla
          >
            {isMenuOpen ? <X size={28} aria-label="Cerrar menú" /> : <Menu size={28} aria-label="Abrir menú" />}
          </button>
        </div>

        {/* Menú móvil (condicional) */}
        {isMenuOpen && (
          <div
            id="mobile-menu" // ID para accesibilidad
            className="lg:hidden fixed inset-0 min-h-screen bg-gradient-to-b from-olive-green to-sky-blue bg-opacity-95 backdrop-blur-md flex flex-col items-center justify-center space-y-6 p-4"
          >
            <button
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Cerrar menú"
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