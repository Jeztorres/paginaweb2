// components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo/logo.png';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Historia', href: '#historia' },
  { name: 'Anuncios', href: '#anuncios' },
  { name: 'Eventos', href: '#eventos' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Traductor', href: '#traductor' },
  { name: 'Contáctanos', href: '#contacto' },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>('#inicio');

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* ---------- Resaltar la sección visible ---------- */
  useEffect(() => {
    const sections = navItems
      .map(i => document.querySelector<HTMLElement>(i.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ---------- Cerrar con clic fuera o ESC ---------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [menuOpen]);

  /* ---------- Bloquear el scroll del body ---------- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const goTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50
                    backdrop-blur-md bg-olive-green/70 shadow-md
                    transition-opacity duration-300
                    ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          {/* Logo (clickable en móvil para volver al inicio) */}
          <div
            onClick={() => goTo('#inicio')}
            className="flex items-center space-x-3 select-none cursor-pointer"
          >
            <img src={logo} alt="Logo Patria Nueva" className="h-11 w-11 rounded-full shadow" />
            <div>
              <h1 className="text-white text-xl font-semibold leading-none">Patria Nueva</h1>
              <p className="text-white text-sm">Santiago de Anaya, Hidalgo</p>
            </div>
          </div>

          {/* Nav escritorio */}
          <nav className="hidden lg:flex space-x-6">
            {navItems.map(item => (
              <button
                key={item.name}
                onClick={() => goTo(item.href)}
                className={`relative px-2 py-1 font-medium transition
                            ${active === item.href ? 'text-sky-blue' : 'text-white hover:text-sky-blue'}`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-sky-blue transition-transform
                              ${active === item.href ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </button>
            ))}
          </nav>

          {/* Botón móvil */}
          <button
            ref={buttonRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md"
            aria-label="Menú"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* ---------- OVERLAY ---------- */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          aria-hidden
        />
      )}

      {/* ---------- PANEL LATERAL ---------- */}
      <aside
        ref={menuRef}
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[80%] bg-olive-green/90
                    backdrop-blur-md shadow-xl transform transition-transform duration-500 ease-out
                    ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-label="Navegación principal"
      >
        <div className="flex h-full flex-col items-center pt-10 pb-6 px-6">
          {/* Cerrar */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-white p-3 rounded-full hover:bg-white/20
                       focus:outline-none focus:ring-2 focus:ring-terracota"
            aria-label="Cerrar menú"
          >
            <X size={30} />
          </button>

          {/* Logo dentro del panel */}
          <div className="mb-10 flex items-center space-x-3">
            <img src={logo} alt="Logo Patria Nueva" className="h-14 w-14 rounded-full shadow-lg" />
            <span className="text-white text-2xl font-semibold">Patria Nueva</span>
          </div>

          {/* Links */}
          <nav className="flex flex-col items-center space-y-6 w-full">
            {navItems.map(item => (
              <button
                key={item.name}
                onClick={() => goTo(item.href)}
                className={`w-full text-center py-3 text-lg font-medium rounded-lg transition
                            ${active === item.href
                              ? 'bg-white/15 text-sky-blue'
                              : 'text-white hover:bg-white/10'}`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <p className="mt-auto pt-8 text-cream text-sm">Patria Nueva © 2025</p>
        </div>
      </aside>
    </>
  );
};

export default Header;

