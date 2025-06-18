import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Facebook, MessageSquare, ExternalLink } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Contacto = () => {
  const ref = useScrollAnimation<HTMLDivElement>();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Nombre: ${formData.nombre}%0A` +
      `Teléfono: ${formData.telefono}%0A%0A${formData.mensaje}`;
    const mailto = `mailto:contacto@patrianueva.gob.mx?subject=${encodeURIComponent(formData.asunto)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
  };

  const abrirMapa = () => {
    // Coordenadas aproximadas de Patria Nueva, Santiago de Anaya, Hidalgo
    const lat = 20.3833;
    const lng = -99.2167;
    const query = "Patria Nueva, Santiago de Anaya, Hidalgo, México";
    
    // Detectar si es móvil para abrir la app nativa
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Intentar abrir Google Maps app primero, luego Apple Maps
      window.open(`https://maps.google.com/maps?q=${encodeURIComponent(query)}&ll=${lat},${lng}`, '_blank');
    } else {
      // En desktop, abrir Google Maps web
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lng},15z`, '_blank');
    }
  };

  return (
    <div ref={ref} className="scroll-animation py-20 bg-cream bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <MessageSquare className="text-olive-green" size={48} />
          </div>
          <h2 className="text-5xl font-bold text-olive-green mb-6">Contáctanos</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Estamos aquí para escucharte. Ponte en contacto con nosotros para cualquier consulta, sugerencia o apoyo que necesites.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div className="bg-white bg-opacity-95 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-olive-green mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-terracota p-3 rounded-full">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-olive-green">Dirección</h4>
                    <p className="text-gray-600">
                      Patria Nueva, Santiago de Anaya<br />
                      Hidalgo, México, C.P. 42350
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-sky-blue p-3 rounded-full">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-olive-green">Teléfono</h4>
                    <p className="text-gray-600">+52 771 234 5677</p>
                    <p className="text-gray-600 text-sm">Lunes a Viernes: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-terracota p-3 rounded-full">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-olive-green">Correo Electrónico</h4>
                    <p className="text-gray-600">contacto@patrianueva.gob.mx</p>
                    <p className="text-gray-600">info@patrianueva.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-sky-blue p-3 rounded-full">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-olive-green">Horarios de Atención</h4>
                    <p className="text-gray-600">Lunes - Viernes: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Sábados: 9:00 AM - 1:00 PM</p>
                    <p className="text-gray-600">Domingos: Cerrado</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-olive-green mb-4">Síguenos en Redes Sociales</h4>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors">
                    <Facebook size={20} />
                  </button>
                  <button className="bg-terracota hover:bg-opacity-90 text-white p-3 rounded-full transition-colors">
                    <MessageSquare size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mapa interactivo */}
            <div className="bg-white bg-opacity-95 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-olive-green mb-6">Nuestra Ubicación</h3>
              
              {/* Mapa embebido de Google Maps */}
              <div className="relative rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14924.123456789!2d-99.2167!3d20.3833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d35a1234567890%3A0x1234567890abcdef!2sPatria%20Nueva%2C%20Santiago%20de%20Anaya%2C%20Hgo.%2C%20Mexico!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
              
              <button
                onClick={abrirMapa}
                className="w-full bg-olive-green hover:bg-opacity-90 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-300"
              >
                <ExternalLink size={20} />
                <span>Abrir en Aplicación de Mapas</span>
              </button>
              
              <p className="text-gray-600 text-sm mt-4 text-center">
                Ubicados en el hermoso Valle del Mezquital, en el corazón de Hidalgo
              </p>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white bg-opacity-95 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-olive-green mb-6">Envíanos un Mensaje</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold text-olive-green mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border-2 border-sky-blue rounded-lg focus:outline-none focus:border-terracota transition-colors"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-semibold text-olive-green mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-sky-blue rounded-lg focus:outline-none focus:border-terracota transition-colors"
                    placeholder="Tu número de teléfono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-olive-green mb-2">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-sky-blue rounded-lg focus:outline-none focus:border-terracota transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="asunto" className="block text-sm font-semibold text-olive-green mb-2">
                  Asunto *
                </label>
                <select
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-sky-blue rounded-lg focus:outline-none focus:border-terracota transition-colors"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="informacion-general">Información General</option>
                  <option value="servicios">Servicios</option>
                  <option value="eventos">Eventos</option>
                  <option value="sugerencias">Sugerencias</option>
                  <option value="quejas">Quejas</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-semibold text-olive-green mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full p-3 border-2 border-sky-blue rounded-lg resize-none focus:outline-none focus:border-terracota transition-colors"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-terracota hover:bg-opacity-90 text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Send size={20} />
                <span>Enviar Mensaje</span>
              </button>
            </form>

            <p className="text-gray-600 text-sm mt-4 text-center">
              * Campos obligatorios. Responderemos a tu mensaje dentro de 24 horas.
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-16 bg-gradient-to-r from-olive-green to-sky-blue bg-opacity-90 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">¿Necesitas Ayuda Inmediata?</h3>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Para emergencias o asuntos urgentes, puedes contactar directamente a nuestras autoridades locales 
            o visitar nuestras oficinas en el horario de atención al público.
          </p>
          <button
            onClick={() => window.open('tel:911', '_self')}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-full font-semibold"
          >
            Emergencias: 911
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
