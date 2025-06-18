import React, { useState } from 'react';
import { Languages, ArrowRightLeft, Volume2, Copy } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Traductor = () => {
  const ref = useScrollAnimation<HTMLDivElement>();
  const [textoEspanol, setTextoEspanol] = useState('');
  const [textoOtomi, setTextoOtomi] = useState('');
  const [direccion, setDireccion] = useState<'esp-hna' | 'hna-esp'>('esp-hna');

  // Diccionario básico para simulación (en un proyecto real esto vendría de una API)
  const diccionario: { [key: string]: string } = {
    'amor': "nzaya / nts'aya",
    'buenos dias': 'ya hne gui ra xudi / ya xudi',
    'buenas tardes': 'ya hne gui ra ndähi / ya ndähi',
    'buenas noches': 'ya hne gui ra xui / ya xui',
    'gracias': 'hñate / jamadi (jamädi)',
    'agua': 'dehe',
    'hombre': 'nuni',
    'mujer': "b'eñ'o / nxutsi",
    'hola': "hia / nts'ofo",
    'sol': "hmunts'i",
    'luna': 'zana',
    'estrella': "ts'i",
    'tierra': "ximha / xi'i",
    'cielo': 'mahets\'i',
    'fuego': 'zi',
    'aire': 'ndähi',
    'día': 'xudi',
    'noche': 'xui',
    'mañana': 'xudi',
    'tarde': 'ndähi',
    'niña': 'bebe',
    'niño': 'nänä',
    'casa': 'ngu',
    'pueblo': 'hñä',
    'grande': 'nts\'ihi',
    'pequeño': 'nts\'its\'i',
    'nuevo': 'ñ\'ehe',
    'viejo': 'hñähñä',
    'bueno': 'hñuni',
    'malo': 'hña',
    'feliz': 'nts\'its\'i',
    'triste': 'nts\'ixu',
    'alto': 'nts\'ihi',
    'bajo': 'nts\'ihi',
    'frío': 'nt\'eni',
    'caliente': 'ts\'ixu',
    'uno': '\'na',
    'dos': 'yoho',
    'tres': 'hñu',
    'cuatro': 'gye',
    'cinco': 'ku',
    'seis': 'räto',
    'siete': 'yoto',
    'ocho': 'hñäto',
    'nueve': 'guada',
    'diez': 'räte',
    'corazón': 'nts\'ixi',
    'mano': 'yo',
    'pie': 'na',
    'cabeza': 'ma',
    'ojo': 'yä',
    'boca': 'ñ\'u',
    'nariz': 'nt\'ä',
    'oreja': 'ma',
    'pelo': 'ya',
    'sangre': 'nts\'ihi',
    'comer': 'hebe',
    'beber': 't\'eni',
    'dormir': 'paja',
    'caminar': 'hñu',
    'correr': 'nja\'ä',
    'hablar': 'hñä',
    'escuchar': 'mañ\'a',
    'ver': 'ya',
    'venir': 'ni',
    'ir': 'xa',
    'sentarse': 'ts\'i',
    'levantarse': 'ndähi',
    'padre': 'tata',
    'madre': 'nana',
    'hermano': 'ndähi',
    'hermana': 'ndähi',
    'amigo': 'nts\'ihi',
    'enemigo': 'nts\'ihi',
    'sí': 'da',
    'no': 'än',
    'yo': 'nuga',
    'tú': 'nuyu',
    'él/ella': 'nuni',
    'nosotros': 'nugu',
    'ustedes': 'nuguni',
    'ellos/ellas': 'nunabi',
    'poco': 'nts\'its\'i',
    'mucho': 'ndunthi',
    'pájaro': 'hñi',
    'perro': 'k\'ani',
    'gato': 'k\'ani',
    'árbol': 'hñuni',
    'flor': 'ts\'ihi',
    'montaña': 'ndähi',
    'río': 'ndähi',
    'camino': 'ya',
    'campo': 'ndähi',
    'casa de campo': 'ngu',
    'lluvia': 'ndähi',
    'nube': 'ndähi',
    'viento': 'ndähi',
    'piedra': 'nts\'ihi',
    'barro': 'ndähi',
    'maíz': 'ndähi',
    'frijol': 'ndähi',
    'chile': 'ts\'i',
    'tortilla': 'k\'ani',
  };

  const traducirTexto = (texto: string, direccionTraduccion: 'esp-hna' | 'hna-esp') => {
    if (!texto.trim()) return '';
    
    const palabras = texto.toLowerCase().split(' ');
    const palabrasTraducidas = palabras.map(palabra => {
      const palabraLimpia = palabra.replace(/[.,!?;]/g, '');
      
      if (direccionTraduccion === 'esp-hna') {
        return diccionario[palabraLimpia] || `[${palabra}]`;
      } else {
        const claveEncontrada = Object.keys(diccionario).find(
          clave => diccionario[clave] === palabraLimpia
        );
        return claveEncontrada || `[${palabra}]`;
      }
    });
    
    return palabrasTraducidas.join(' ');
  };

  const manejarTraduccion = () => {
    if (direccion === 'esp-hna') {
      const traduccion = traducirTexto(textoEspanol, 'esp-hna');
      setTextoOtomi(traduccion);
    } else {
      const traduccion = traducirTexto(textoOtomi, 'hna-esp');
      setTextoEspanol(traduccion);
    }
  };

  const cambiarDireccion = () => {
    setDireccion(direccion === 'esp-hna' ? 'hna-esp' : 'esp-hna');
    setTextoEspanol('');
    setTextoOtomi('');
  };

  const copiarTexto = (texto: string) => {
    navigator.clipboard.writeText(texto);
  };

  const palabrasComunes = [
    { esp: 'Hola', hna: "Hia / Nts'ofo" },
    { esp: 'Gracias', hna: 'Hñate / Jamadi (Jamädi)' },
    { esp: 'Amor', hna: "Nzaya / Nts'aya" },
    { esp: 'Agua', hna: 'Dehe' },
    { esp: 'Niño', hna: 'Nänä' },
    { esp: 'Pueblo', hna: 'Hñä' }
  ];

  return (
    <div
      ref={ref}
      className="scroll-animation py-20 bg-gradient-to-br from-sky-blue to-olive-green"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Languages className="text-white" size={48} />
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">Traductor Español - Otomí</h2>
          <p className="text-xl text-cream max-w-4xl mx-auto leading-relaxed">
            Preservamos nuestra lengua ancestral del Valle del Mezquital. Traduce entre español y otomí.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header del traductor */}
            <div className="bg-gradient-to-r from-terracota to-olive-green p-6 text-white">
              <div className="flex items-center justify-center space-x-4">
                <span className="font-semibold text-lg">
                  {direccion === 'esp-hna' ? 'Español' : 'Otomí'}
                </span>
                <button
                  onClick={cambiarDireccion}
                  className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors"
                >
                  <ArrowRightLeft size={20} />
                </button>
                <span className="font-semibold text-lg">
                  {direccion === 'esp-hna' ? 'Otomí' : 'Español'}
                </span>
              </div>
            </div>

            {/* Área de traducción */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-olive-green">
                  {direccion === 'esp-hna' ? 'Español' : 'Otomí'}
                  </label>
                  <textarea
                    value={direccion === 'esp-hna' ? textoEspanol : textoOtomi}
                    onChange={(e) => {
                      if (direccion === 'esp-hna') {
                        setTextoEspanol(e.target.value);
                      } else {
                        setTextoOtomi(e.target.value);
                      }
                    }}
                    placeholder={`Escribe en ${direccion === 'esp-hna' ? 'español' : 'otomí'}...`}
                    className="w-full h-32 p-4 border-2 border-sky-blue rounded-lg resize-none focus:outline-none focus:border-terracota transition-colors"
                  />
                </div>

                {/* Output */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold text-olive-green">
                      {direccion === 'esp-hna' ? 'Otomí' : 'Español'}
                    </label>
                    {(direccion === 'esp-hna' ? textoOtomi : textoEspanol) && (
                      <button
                        onClick={() => copiarTexto(direccion === 'esp-hna' ? textoOtomi : textoEspanol)}
                        className="text-terracota hover:text-opacity-80 transition-colors"
                        title="Copiar texto"
                      >
                        <Copy size={18} />
                      </button>
                    )}
                  </div>
                  <div className="w-full h-32 p-4 bg-cream border-2 border-gray-200 rounded-lg overflow-y-auto">
                    <p className="text-gray-700">
                      {direccion === 'esp-hna' ? textoOtomi : textoEspanol || 'La traducción aparecerá aquí...'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={manejarTraduccion}
                  className="bg-terracota hover:bg-opacity-90 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Traducir
                </button>
              </div>
            </div>
          </div>

          {/* Palabras comunes */}
          <div className="mt-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Palabras Comunes</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {palabrasComunes.map((palabra, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-20 rounded-lg p-4 text-center hover:bg-opacity-30 transition-colors cursor-pointer"
                  onClick={() => {
                    if (direccion === 'esp-hna') {
                      setTextoEspanol(palabra.esp);
                      setTextoOtomi(palabra.hna);
                    } else {
                      setTextoOtomi(palabra.hna);
                      setTextoEspanol(palabra.esp);
                    }
                  }}
                >
                  <p className="text-white font-semibold text-sm mb-1">{palabra.esp}</p>
                  <p className="text-cream text-xs">{palabra.hna}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Información cultural */}
          <div className="mt-8 bg-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-olive-green mb-4 text-center">Sobre el Otomí</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h4 className="font-semibold text-terracota mb-2">Historia</h4>
                <p className="text-sm leading-relaxed">
                  El otomí es una lengua indígena de México hablada principalmente
                  en el Valle del Mezquital, Hidalgo. Es parte fundamental de nuestra identidad cultural.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-terracota mb-2">Importancia</h4>
                <p className="text-sm leading-relaxed">
                  Preservar el otomí es mantener viva nuestra herencia ancestral. Cada palabra lleva consigo
                  siglos de sabiduría y tradición de nuestros antepasados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traductor;
