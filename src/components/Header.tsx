import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react'; // Asegúrate de tener 'lucide-react' instalado

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Referencia para el botón que abre el menú (útil para accesibilidad o futuras interacciones)
  const menuButtonRef = useRef(null);

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

  useEffect(() => {
    // Cuando el menú se abre, evita que el scroll del cuerpo de la página funcione
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Limpieza al desmontar o al cerrar el menú
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]); // Se ejecuta cada vez que isMenuOpen cambia

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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-emerald-800/90 to-lime-700/90 backdrop-blur-md shadow-lg' // Verde más oscuro y vibrante al scroll
          : 'bg-gradient-to-r from-emerald-700/70 to-lime-600/70 backdrop-blur-md' // Verde oliva suave
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo y nombre del sitio */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center shadow-md"> {/* Naranja terracota */}
              <span className="text-white font-bold text-xl">PN</span>
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold tracking-wide">Patria Nueva</h1>
              <p className="text-white/80 text-sm">Santiago de Anaya, Hidalgo</p> {/* Texto más sutil */}
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
        </div>

        {/* Menú móvil (Overlay a pantalla completa con diseño centrado) */}
        <div
          id="mobile-menu"
          className={`lg:hidden fixed inset-0 z-50 flex items-center justify-center
                      bg-gradient-to-br from-emerald-800 to-lime-700
                      transition-opacity duration-500 ease-in-out ${
                        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
        >
          {/* Botón de cerrar el menú */}
          <button
            className="absolute top-6 right-6 text-white p-3 rounded-full hover:bg-white/20 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={36} /> {/* Icono más grande y prominente */}
          </button>

          {/* Contenido del menú - Centrado y con buen espaciado */}
          <nav className="flex flex-col items-center justify-center space-y-8 p-4 w-full max-w-sm mx-auto">
            {/* Opcional: Logo dentro del menú para coherencia */}
            <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center shadow-lg mb-4">
              <span className="text-white font-extrabold text-3xl">PN</span>
            </div>

            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white text-3xl font-semibold hover:text-orange-400 transition-colors duration-300
                           py-4 px-6 w-full text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400
                           transform hover:scale-105 active:scale-95 transition-transform"
              >
                {item.name}
              </button>
            ))}

            {/* Opcional: Separador o texto adicional */}
            <div className="w-1/2 h-px bg-white/30 my-6"></div>
            <p className="text-white/70 text-sm">Diseñado con 🧡 para la comunidad de Patria Nueva</p>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
