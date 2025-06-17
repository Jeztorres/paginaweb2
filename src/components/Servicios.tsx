import React from 'react';
import { Phone, Globe, Mail, GraduationCap, Heart, Droplets, Users, Clock, MapPin } from 'lucide-react';

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  icono: React.ReactNode;
  contacto?: {
    telefono?: string;
    email?: string;
    website?: string;
  };
  detalles: string[];
  categoria: 'educacion' | 'salud' | 'basicos';
  imagen: string;
}

const Servicios = () => {
  const servicios: Servicio[] = [
    {
      id: 1,
      nombre: "CECYTEH Plantel Santiago de Anaya",
      descripcion: "Impulsamos tu potencial con una formación tecnológica de vanguardia. En CECyTEH, construimos líderes y profesionales listos para innovar.",
      icono: <GraduationCap size={32} />,
      contacto: {
        telefono: "7721352514",
        website: "https://cecyteh.edu.mx/generar_planteles.php?id_plantel=21"
      },
      detalles: [
        "Horario: Lunes a Viernes: 8:00 AM - 4:00 PM",
        "Educación media superior técnica de calidad",
        "Formación tecnológica de vanguardia",
        "Preparación de líderes y profesionales",
        "Programas técnicos especializados"
      ],
      categoria: 'educacion',
      imagen: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      nombre: "ICATHI Acción Móvil de Capacitación",
      descripcion: "Llevamos la formación profesional directamente a tu comunidad. Obtén las habilidades que necesitas para el trabajo o para emprender, abriendo nuevas puertas hacia un futuro lleno de oportunidades.",
      icono: <GraduationCap size={32} />,
      contacto: {
        email: "santiagodeanaya@icathi.edu.mx"
      },
      detalles: [
        "Horario: Lunes a Viernes: 9:00 AM - 6:00 PM",
        "Cursos y talleres para el desarrollo de habilidades",
        "Formación profesional móvil",
        "Capacitación para el trabajo",
        "Programas de emprendimiento"
      ],
      categoria: 'educacion',
      imagen: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      nombre: "Telesecundaria 639",
      descripcion: "En la Telesecundaria 639, ofrecemos una educación de calidad que empodera a nuestros estudiantes para un futuro brillante.",
      icono: <GraduationCap size={32} />,
      contacto: {
        telefono: "772119164"
      },
      detalles: [
        "Horario: 8:00 AM - 2:00 PM de Lunes a Viernes",
        "Educación secundaria de calidad",
        "Sistema telesecundaria",
        "Formación integral de estudiantes",
        "Preparación para el futuro"
      ],
      categoria: 'educacion',
      imagen: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      nombre: "Kinder Emiliano Zapata",
      descripcion: "Somos el primer paso en la increíble aventura del aprendizaje. Aquí, nuestros pequeños exploradores descubren el mundo a través del juego, la creatividad y el compañerismo.",
      icono: <GraduationCap size={32} />,
      contacto: {},
      detalles: [
        "Horario: 9:00 AM - 12:00 PM de Lunes a Viernes",
        "Educación preescolar de calidad",
        "Aprendizaje a través del juego",
        "Desarrollo de creatividad y compañerismo",
        "Bases sólidas para el futuro"
      ],
      categoria: 'educacion',
      imagen: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 5,
      nombre: "Escuela Primaria General \"Lázaro Cárdenas\"",
      descripcion: "Cada día es una oportunidad para aprender, crecer y soñar. Cultivamos el conocimiento y los valores, sentando las bases para que nuestros alumnos construyan un futuro brillante.",
      icono: <GraduationCap size={32} />,
      contacto: {},
      detalles: [
        "Horario: 8:00 AM - 1:00 PM",
        "Educación primaria integral",
        "Cultivo de conocimiento y valores",
        "Formación de ciudadanos comprometidos",
        "Bases para un futuro brillante"
      ],
      categoria: 'educacion',
      imagen: "https://images.pexels.com/photos/8613092/pexels-photo-8613092.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 6,
      nombre: "Centro de Salud Patria Nueva",
      descripcion: "Estamos comprometidos con el bienestar integral de cada familia. Ofrecemos atención médica cercana y de calidad, siendo tu primer punto de apoyo para una vida más sana y plena.",
      icono: <Heart size={32} />,
      contacto: {},
      detalles: [
        "Horario: Lunes a Viernes: 8:00 AM - 3:00 PM",
        "Sábado y Domingo: Cerrado",
        "Atención médica de calidad",
        "Bienestar integral familiar",
        "Servicios de salud comunitaria"
      ],
      categoria: 'salud',
      imagen: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 7,
      nombre: "Servicio de Agua",
      descripcion: "Somos el motor vital de Patria Nueva, garantizando el acceso a un recurso esencial. Con compromiso y responsabilidad, aseguramos un suministro confiable de agua potable.",
      icono: <Droplets size={32} />,
      contacto: {},
      detalles: [
        "Atención en delegación: Domingo 9:00 AM - 11:00 AM",
        "Suministro confiable de agua potable",
        "Servicio esencial para la comunidad",
        "Acudir a las oficinas para trámites",
        "Compromiso con la salud comunitaria"
      ],
      categoria: 'basicos',
      imagen: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const getCategoriaInfo = (categoria: string) => {
    switch (categoria) {
      case 'educacion':
        return { color: 'bg-terracota', titulo: 'Educación' };
      case 'salud':
        return { color: 'bg-sky-blue', titulo: 'Salud' };
      case 'basicos':
        return { color: 'bg-olive-green', titulo: 'Servicios Básicos' };
      default:
        return { color: 'bg-gray-500', titulo: 'Otros' };
    }
  };

  const handleContacto = (tipo: string, valor: string) => {
    if (tipo === 'telefono') {
      window.open(`tel:${valor}`, '_self');
    } else if (tipo === 'email') {
      window.open(`mailto:${valor}`, '_self');
    } else if (tipo === 'website') {
      window.open(valor, '_blank');
    }
  };

  return (
    <div className="py-20 bg-cream bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Users className="text-olive-green" size={48} />
          </div>
          <h2 className="text-5xl font-bold text-olive-green mb-6">Servicios Comunitarios</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Conoce los servicios e instituciones que están disponibles para ti y tu familia en Patria Nueva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio) => {
            const categoriaInfo = getCategoriaInfo(servicio.categoria);
            
            return (
              <div key={servicio.id} className="bg-white bg-opacity-95 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48">
                  <img 
                    src={servicio.imagen} 
                    alt={servicio.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 left-4 ${categoriaInfo.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {categoriaInfo.titulo}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`${categoriaInfo.color} p-2 rounded-full mr-3`}>
                      <div className="text-white">
                        {servicio.icono}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-olive-green line-clamp-2">
                      {servicio.nombre}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {servicio.descripcion}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-olive-green mb-3 text-sm">Información:</h4>
                    <ul className="space-y-1">
                      {servicio.detalles.map((detalle, index) => (
                        <li key={index} className="flex items-start text-xs text-gray-600">
                          <div className="w-1.5 h-1.5 bg-terracota rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                          {detalle}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {(servicio.contacto?.telefono || servicio.contacto?.email || servicio.contacto?.website) && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-olive-green mb-3 text-sm">Contacto:</h4>
                      <div className="flex flex-wrap gap-2">
                        {servicio.contacto.telefono && (
                          <button
                            onClick={() => handleContacto('telefono', servicio.contacto!.telefono!)}
                            className="flex items-center space-x-1 bg-terracota hover:bg-opacity-90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300"
                          >
                            <Phone size={12} />
                            <span>Llamar</span>
                          </button>
                        )}
                        
                        {servicio.contacto.email && (
                          <button
                            onClick={() => handleContacto('email', servicio.contacto!.email!)}
                            className="flex items-center space-x-1 bg-sky-blue hover:bg-opacity-90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300"
                          >
                            <Mail size={12} />
                            <span>Email</span>
                          </button>
                        )}
                        
                        {servicio.contacto.website && (
                          <button
                            onClick={() => handleContacto('website', servicio.contacto!.website!)}
                            className="flex items-center space-x-1 bg-olive-green hover:bg-opacity-90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300"
                          >
                            <Globe size={12} />
                            <span>Sitio Web</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-olive-green to-sky-blue bg-opacity-90 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">¿Necesitas Ayuda?</h3>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Si requieres asistencia adicional o tienes preguntas sobre cualquiera de nuestros servicios, 
            no dudes en contactar a las autoridades locales o visitar nuestras oficinas comunitarias.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              Atención Ciudadana
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              Servicios de Calidad
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              Apoyo Comunitario
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;