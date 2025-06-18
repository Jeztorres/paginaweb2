import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User } from 'lucide-react'; // Importamos 'User' para el icono de perfil si lo deseas

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Referencia para detectar clics fuera del menú
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

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
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
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

  const navItems = [
    { name: 'Anuncios Importantes', href: '#anuncios' },
    { name: 'Eventos', href: '#eventos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Traductor', href: '#traductor' },
    { name: 'Contáctanos', href: '#contacto' },
  ];

  // Agregamos ítems para el "perfil" o acciones del usuario, similar a la imagen
  const userActions = [
    { name: 'Últimas actualizaciones', href: '#updates' },
    { name: 'Obtener ayuda', href: '#help' },
    { name: 'Centro de ayuda', href: '#help-center' },
    { name: 'Atajos', href: '#shortcuts' },
    { name: 'Enviar comentarios', href: '#feedback' },
    { name: 'Política de privacidad', href: '#privacy' },
    { name: 'Cerrar sesión', href: '#logout' },
  ];

  const scrollToSection = (href: string) => {
    if (typeof href === 'string' && href.trim() !== '') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false); // Cierra el menú después de la navegación
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-green-800/90 to-blue-600/90 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-r from-green-700/70 to-blue-500/70 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 relative"> {/* relative para posicionar el menú */}
          {/* Logo y nombre del sitio */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">PN</span>
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">Patria Nueva</h1>
              <p className="text-blue-200 text-sm">Santiago de Anaya, Hidalgo</p>
            </div>
          </div>

          {/* Navegación para pantallas grandes */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-blue-200 transition-colors duration-300 font-medium px-3 py-2 rounded-md"
              >
                {item.name}
              </button>
            ))}
            {/* Si quieres un botón de perfil también en desktop */}
            <button
                className="text-white p-2 ml-4 focus:outline-none focus:ring-2 focus:ring-white rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)} // Podría abrir el mismo menú o uno específico
                ref={buttonRef}
                aria-label="Abrir menú de usuario"
            >
                <User size={24} />
            </button>
          </nav>

          {/* Botón de menú para dispositivos móviles / perfil */}
          <button
            className="lg:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-white rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={buttonRef} // Asignamos la ref al botón que abre el menú
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={28} aria-label="Cerrar menú" /> : <Menu size={28} aria-label="Abrir menú" />}
            {/* O podrías usar un icono de usuario aquí si siempre es un menú de perfil */}
            {/* {isMenuOpen ? <X size={28} aria-label="Cerrar menú" /> : <User size={28} aria-label="Abrir menú de usuario" />} */}
          </button>

          {/* Menú flotante (Popover) */}
          {isMenuOpen && (
            <div
              id="mobile-menu"
              ref={menuRef} // Asignamos la ref al contenedor del menú
              className={`absolute right-4 top-full mt-2 w-72 bg-white rounded-lg shadow-xl overflow-hidden
                         border border-gray-200 transition-all duration-300 ease-out transform
                         ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                         style={{ transformOrigin: 'top right' }} // Anima desde la esquina superior derecha
            >
              {/* Sección de perfil */}
              <div className="flex items-center p-4 border-b border-gray-200 bg-gray-50">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Username</p>
                  <button
                    onClick={() => scrollToSection('#profile')}
                    className="text-purple-600 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-sm"
                  >
                    View profile
                  </button>
                </div>
              </div>

              {/* Elementos de navegación principales (sección de tu app) */}
              <nav className="py-2 border-b border-gray-200">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:bg-gray-100"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              {/* Elementos de acciones de usuario/soporte */}
              <nav className="py-2">
                {userActions.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:bg-gray-100"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
