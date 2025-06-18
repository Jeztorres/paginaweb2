import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react'; // Asegúrate de tener 'lucide-react' instalado

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Referencia para el contenedor del menú para cerrar al hacer clic fuera
  const menuRef = useRef(null);
  // Referencia para el botón de menú para evitar cerrarlo al hacer clic en él
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      // Si el menú está abierto y el clic no fue dentro del menú ni en el botón que lo abre
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside); // Escucha clics en todo el documento

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]); // El efecto se vuelve a ejecutar si isMenuOpen cambia

  useEffect(() => {
    // Cuando el menú se abre, evita que el scroll del cuerpo de la página funcione
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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
    if (typeof href === 'string' && href.trim() !== '') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false); // Cierra el menú móvil después de hacer clic en un enlace.
  };

  // --- Colores personalizados basados en la imagen (ajusta estos si es necesario) ---
  const customGreenStart = '#3C8159'; // Un verde oscuro más cercano al de tu imagen para el degradado
  const customGreenEnd = '#4A8D63';   // Otro tono de verde para el final del degradado
  const customDarkGreenHeader = '#346D4B'; // Para el header cuando no hay scroll
  const customOrange = '#E65100'; // Un naranja terracota más cercano a los ejemplos HTML (si el anterior no fue)

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? `bg-gradient-to-r from-[${customGreenStart}]/90 to-[${customGreenEnd}]/90 backdrop-blur-md shadow-lg`
          : `bg-gradient-to-r from-[${customGreenStart}]/70 to-[${customGreenEnd}]/70 backdrop-blur-md`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 relative">
          {/* Logo y nombre del sitio */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                 style={{ backgroundColor: customOrange }}> {/* Naranja terracota */}
              <span className="text-white font-bold text-xl">PN</span>
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold tracking-wide">Patria Nueva</h1>
              <p className="text-white/80 text-sm">Santiago de Anaya, Hidalgo</p>
            </div>
          </div>

          {/* Navegación para pantallas grandes */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-orange-300 transition-colors duration-300 font-medium px-3 py-2 rounded-md"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Botón de menú para dispositivos móviles */}
          <button
            className="lg:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-white rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={menuButtonRef}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={28} aria-label="Cerrar menú" /> : <Menu size={28} aria-label="Abrir menú" />}
          </button>

          {/* Menú móvil (Panel flotante desde la derecha) */}
          <div
            id="mobile-menu"
            ref={menuRef}
            className={`lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-sm z-50
                        bg-gradient-to-br from-[${customGreenStart}] to-[${customGreenEnd}]
                        shadow-2xl transform transition-transform duration-500 ease-out
                        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            {/* Capa de fondo oscurecida (overlay) - SOLO CUANDO EL MENÚ ESTÁ ABIERTO */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}

            {/* Contenido del menú - dentro del panel deslizante */}
            <div className="relative h-full flex flex-col items-center py-8 px-6">
                {/* Botón de cerrar el menú */}
                <button
                    className="absolute top-6 right-6 text-white p-3 rounded-full hover:bg-white/20 transition-colors
                                focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Cerrar menú"
                >
                    <X size={32} /> {/* Un poco más pequeño que antes, más discreto */}
                </button>

                {/* Logo dentro del menú (opcional) */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-8"
                     style={{ backgroundColor: customOrange }}>
                  <span className="text-white font-extrabold text-2xl">PN</span>
                </div>

                {/* Elementos de navegación */}
                <nav className="flex flex-col items-center space-y-6 flex-grow">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-white text-xl font-semibold hover:text-orange-300 transition-colors duration-300
                                 py-3 px-4 w-full text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300
                                 transform hover:scale-105 active:scale-95 transition-transform"
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>

                {/* Texto adicional al final del menú */}
                <p className="text-white/60 text-sm mt-auto pt-6 border-t border-white/20 w-full text-center">
                  Patria Nueva © 2025
                </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
