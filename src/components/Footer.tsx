import { Heart, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import logo from '../assets/logo/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-olive-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la comunidad */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex flex-col items-center md:flex-row md:justify-start md:space-x-3 space-y-2 md:space-y-0">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={logo} alt="Logo Patria Nueva" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Patria Nueva</h3>
                <p className="text-sky-blue text-sm">Santiago de Anaya, Hidalgo</p>
              </div>
            </div>
            <p className="text-cream text-sm leading-relaxed">
              Antiguamente Barrio del Capulín, un hermoso pueblo en el corazón de Hidalgo, donde la tradición y la modernidad se encuentran.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="text-center md:text-left">
            <h4
              className="text-lg font-semibold mb-4 text-terracota"
              style={{ textShadow: '1px 1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff' }}
            >
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="text-cream hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#historia" className="text-cream hover:text-white transition-colors">
                  Nuestra Historia
                </a>
              </li>
              <li>
                <a href="#eventos" className="text-cream hover:text-white transition-colors">
                  Fiestas y Tradiciones
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-cream hover:text-white transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#traductor" className="text-cream hover:text-white transition-colors">
                  Traductor Otomí
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="text-center md:text-left">
            <h4
              className="text-lg font-semibold mb-4 text-terracota"
              style={{ textShadow: '1px 1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff' }}
            >
              Contacto
            </h4>
            <div className="flex justify-center md:justify-start space-x-4 text-sky-blue">
              <MapPin size={20} />
              <Phone size={20} />
              <Mail size={20} />
            </div>
          </div>

          {/* Próximos eventos */}
          <div className="text-center md:text-left">
            <h4
              className="text-lg font-semibold mb-4 text-terracota"
              style={{ textShadow: '1px 1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff' }}
            >
              Próximos Eventos
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Calendar size={16} className="text-sky-blue mt-1" />
                <div>
                  <p className="text-white font-semibold">Feria Patronal</p>
                  <p className="text-cream">1 de Julio</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Calendar size={16} className="text-sky-blue mt-1" />
                <div>
                  <p className="text-white font-semibold">Grito de Independencia</p>
                  <p className="text-cream">15 de Septiembre</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-sky-blue my-8"></div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
          <div className="flex items-center space-x-2 text-sm text-cream">
            <span>Hecho con</span>
            <Heart size={16} className="text-terracota" />
            <span>para nuestra comunidad</span>
          </div>
          
          <div className="text-sm text-cream">
            © {currentYear} Patria Nueva, Santiago de Anaya, Hidalgo. Todos los derechos reservados.
          </div>
        </div>

        {/* Dedicatoria cultural */}
        <div className="mt-8 pt-6 border-t border-sky-blue text-center">
          <p className="text-cream text-sm italic">
            "Preservando nuestras tradiciones, construyendo nuestro futuro"
          </p>
          <p className="text-sky-blue text-xs mt-2">
            Valle del Mezquital - Tierra de historia y tradición
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;