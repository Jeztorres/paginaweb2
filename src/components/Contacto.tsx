import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

const Contacto: React.FC = () => {
  const ref = useScrollAnimation<HTMLDivElement>();

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Google Forms integration
  const GOOGLE_FORM_ACTION =
    'https://docs.google.com/forms/d/e/1FAIpQLScYw6yq_60ol0RuTkUwntgcIkI3j2cdCtXewxwbNoa1gtjRmw/formResponse';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataGoogle = new FormData();
    formDataGoogle.append('entry.241409678', formData.nombre);
    formDataGoogle.append('entry.471509056', formData.email);
    formDataGoogle.append('entry.594078676', formData.telefono);
    formDataGoogle.append('entry.1075442742', formData.asunto);
    formDataGoogle.append('entry.1370799519', formData.mensaje);
    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataGoogle,
      });
      setStatus('success');
      setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      setStatus('error');
    }
  };

  // Coordenadas exactas de Patria Nueva, Santiago de Anaya, Hidalgo
  // 20° 22’ 15.480” N = 20.370967, 99° 03’ 06.397” O = -99.051777
  const lat = 20.370967;
  const lng = -99.051777;
  const query = 'Patria Nueva, Santiago de Anaya, Hidalgo';

  const abrirMapa = () => {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      window.open(
        `https://maps.google.com/maps?q=${encodeURIComponent(query)}&ll=${lat},${lng}`,
        '_blank'
      );
    } else {
      window.open(
        `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lng},15z`,
        '_blank'
      );
    }
  };

  return (
    <div ref={ref} className="scroll-animation py-20 bg-cream bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <MessageSquare className="text-olive-green" size={48} />
          </div>
          <h2 className="text-5xl font-bold text-olive-green mb-6">Contáctanos</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Estamos aquí para escucharte. Ponte en contacto con nosotros para cualquier consulta,
            sugerencia o apoyo que necesites.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto + mapa */}
          <div className="space-y-10">
            {/* Datos de contacto */}
            <div className="space-y-8">
              {/* Dirección */}
              <div className="flex items-start space-x-4">
                <div className="bg-olive-green p-3 rounded-full">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-olive-green">Dirección</h4>
                  <p className="text-gray-600">
                    Patria Nueva, Municipio de Santiago de Anaya<br />
                    Hidalgo, México, C.P. 42350
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start space-x-4">
                <div className="bg-sky-blue p-3 rounded-full">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-olive-green">Teléfono</h4>
                  <p className="text-gray-600"></p>
                </div>
              </div>

              {/* Correo */}
              <div className="flex items-start space-x-4">
                <div className="bg-terracota p-3 rounded-full">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-olive-green">Correo Electrónico</h4>
                  <p className="text-gray-600"></p>
                </div>
              </div>

              {/* Horarios */}
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

            {/* Redes sociales */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-olive-green mb-4">Síguenos en Redes Sociales</h4>
              <div className="flex space-x-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </button>
                <button
                  className="bg-terracota hover:bg-opacity-90 text-white p-3 rounded-full transition-colors"
                  aria-label="Messenger"
                >
                  <MessageSquare size={20} />
                </button>
              </div>
            </div>

            {/* Mapa */} 
            <div className="bg-white bg-opacity-95 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-olive-green mb-6">Nuestra Ubicación</h3>
              <div className="relative rounded-lg overflow-hidden mb-4">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=es&z=14&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title="Ubicación Patria Nueva"
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
          <div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white bg-opacity-95 rounded-2xl p-8 shadow-lg"
            >
              {/* Nombre */}
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-semibold text-olive-green mb-2"
                >
                  Nombre *
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

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-olive-green mb-2"
                >
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
                  placeholder="tu@correo.com"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-semibold text-olive-green mb-2"
                >
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-sky-blue rounded-lg focus:outline-none focus:border-terracota transition-colors"
                  placeholder="+52 771..."
                />
              </div>

              {/* Asunto */}
              <div>
                <label
                  htmlFor="asunto"
                  className="block text-sm font-semibold text-olive-green mb-2"
                >
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
                  <option value="" disabled>
                    Selecciona un asunto
                  </option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="queja">Queja</option>
                  <option value="ayuda">Ayuda</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-semibold text-olive-green mb-2"
                >
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

              {/* Botón enviar */}
              <button
                type="submit"
                className="w-full bg-terracota hover:bg-opacity-90 text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Send size={20} />
                <span>Enviar Mensaje</span>
              </button>

              {status === 'success' && (
                <p className="text-green-600 text-center mt-4">Mensaje enviado exitosamente.</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-center mt-4">
                  Hubo un error al enviar el mensaje. Intenta nuevamente.
                </p>
              )}

              <p className="text-gray-600 text-sm mt-4 text-center">
                * Campos obligatorios. Responderemos a tu mensaje dentro de 24 horas.
              </p>
            </form>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-16 bg-gradient-to-r from-olive-green to-sky-blue bg-opacity-90 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">¿Necesitas Ayuda Inmediata?</h3>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Para emergencias o asuntos urgentes, puedes contactar directamente a nuestras autoridades
            locales o visitar nuestras oficinas en el horario de atención al público.
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
