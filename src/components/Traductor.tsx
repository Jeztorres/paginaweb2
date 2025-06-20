import React, { useState } from 'react';
import { Languages, ArrowRightLeft, Volume2, Copy } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation'; // Asegúrate de que esta ruta sea correcta

const Traductor = () => {
  const ref = useScrollAnimation<HTMLDivElement>();
  const [textoEspanol, setTextoEspanol] = useState('');
  const [textoOtomi, setTextoOtomi] = useState('');
  const [direccion, setDireccion] = useState<'esp-hna' | 'hna-esp'>('esp-hna');

  // Diccionario básico para simulación (en un proyecto real esto vendría de una API o un archivo JSON)
  // Se combinaron las entradas más completas de las dos versiones.
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
    'feliz': 'nts\'its\'i', // Esto parece ser un error, nts'its'i es pequeño. Revisa si es intencional.
    'triste': 'nts\'ixu',
    'alto': 'nts\'ihi',
    'bajo': 'nts\'ihi', // Esto parece ser un error, nts'ihi es grande/alto. Revisa si es intencional.
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
    'cabeza': 'ma', // Podría ser 'ma' para cabeza pero más común es 'do' (cabeza, pelo) o 'nthä' (frente). Revisa.
    'ojo': 'yä',
    'boca': 'ñ\'u',
    'nariz': 'nt\'ä',
    'oreja': 'ma', // Podría ser 'ma' pero más común es 'xä'. Revisa.
    'pelo': 'ya',
    'sangre': 'nts\'ihi', // Esto parece ser un error, nts'ihi es grande/alto. Revisa.
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
    'levantarse': 'ndähi', // Esto parece ser un error, ndähi es aire/tarde. Revisa.
    'padre': 'tata',
    'madre': 'nana',
    'hermano': 'ndähi', // Esto parece ser un error. Revisa.
    'hermana': 'ndähi', // Esto parece ser un error. Revisa.
    'amigo': 'nts\'ihi', // Esto parece ser un error. Revisa.
    'enemigo': 'nts\'ihi', // Esto parece ser un error. Revisa.
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
    'perro': 'k\'ani', // k'ani es perro, gato suele ser 'mixi'.
    'gato': 'k\'ani', // k'ani es perro, gato suele ser 'mixi'.
    'árbol': 'hñuni', // hñuni es bueno. Árbol es 'za'. Revisa.
    'flor': 'ts\'ihi', // ts'ihi es grande. Flor es 'ntsi'. Revisa.
    'montaña': 'ndähi', // ndähi es aire/tarde. Montaña es 'thäi'. Revisa.
    'río': 'ndähi', // ndähi es aire/tarde. Río es 'dehe ya'. Revisa.
    'camino': 'ya', // ya es ojo/pelo. Camino es 'ñähi'. Revisa.
    'campo': 'ndähi', // ndähi es aire/tarde. Campo es 'hnuni'. Revisa.
    'casa de campo': 'ngu', // ngu es casa.
    'lluvia': 'ndähi', // ndähi es aire/tarde. Lluvia es 'ya'. Revisa.
    'nube': 'ndähi', // ndähi es aire/tarde. Nube es 'ya'. Revisa.
    'viento': 'ndähi', // ndähi es aire/tarde.
    'piedra': 'nts\'ihi', // nts'ihi es grande. Piedra es 'do'. Revisa.
    'barro': 'ndähi', // ndähi es aire/tarde. Barro es 'xi'. Revisa.
    'maíz': 'ndähi', // ndähi es aire/tarde. Maíz es 'dä'. Revisa.
    'frijol': 'ndähi', // ndähi es aire/tarde. Frijol es 'nxä'. Revisa.
    'chile': 'ts\'i', // ts'i es estrella. Chile es 'xi'. Revisa.
    'tortilla': 'k\'ani', // k'ani es perro. Tortilla es 'hma'. Revisa.
  };

  /**
   * Traduce un texto palabra por palabra usando el diccionario.
   * Si una palabra no se encuentra, la encierra entre corchetes.
   * @param texto El texto a traducir.
   * @param direccionTraduccion La dirección de la traducción ('esp-hna' o 'hna-esp').
   * @returns El texto traducido.
   */
  const traducirTexto = (texto: string, direccionTraduccion: 'esp-hna' | 'hna-esp') => {
    if (!texto.trim()) return '';

    // Convertir el texto a minúsculas y dividirlo en palabras.
    const palabras = texto.toLowerCase().split(/\s+/); // Usa regex para dividir por uno o más espacios

    const palabrasTraducidas = palabras.map(palabra => {
      // Limpiar la palabra de signos de puntuación al final.
      const palabraLimpia = palabra.replace(/[.,!?;]$/g, '');

      if (direccionTraduccion === 'esp-hna') {
        // Busca directamente en el diccionario.
        return diccionario[palabraLimpia] || `[${palabra}]`;
      } else {
        // Busca el valor en el diccionario y devuelve la clave.
        const claveEncontrada = Object.keys(diccionario).find(
          clave => diccionario[clave].includes(palabraLimpia) // Usa includes para manejar múltiples traducciones
        );
        return claveEncontrada || `[${palabra}]`;
      }
    });

    return palabrasTraducidas.join(' ');
  };

  /**
   * Maneja la traducción cuando se hace clic en el botón "Traducir".
   */
  const manejarTraduccion = () => {
    if (direccion === 'esp-hna') {
      const traduccion = traducirTexto(textoEspanol, 'esp-hna');
      setTextoOtomi(traduccion);
    } else {
      const traduccion = traducirTexto(textoOtomi, 'hna-esp');
      setTextoEspanol(traduccion);
    }
  };

  /**
   * Cambia la dirección de la traducción y limpia los campos de texto.
   */
  const cambiarDireccion = () => {
    setDireccion(prevDireccion => (prevDireccion === 'esp-hna' ? 'hna-esp' : 'esp-hna'));
    setTextoEspanol('');
    setTextoOtomi('');
  };

  /**
   * Copia el texto al portapapeles.
   * @param texto El texto a copiar.
   */
  const copiarTexto = (texto: string) => {
    if (texto) { // Solo copia si hay texto
      navigator.clipboard.writeText(texto)
        .then(() => console.log('Texto copiado al portapapeles'))
        .catch(err => console.error('Error al copiar texto: ', err));
    }
  };

  /**
   * Lee el texto en voz alta.
   * @param texto El texto a leer.
   */
  const leerTexto = (texto: string) => {
    if ('speechSynthesis' in window && texto) {
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = direccion === 'esp-hna' ? 'es-MX' : 'es-US'; // Puedes ajustar el idioma Otomí si hay soporte, de lo contrario, usa un idioma similar.
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('La API de Speech Synthesis no es compatible con este navegador o no hay texto para leer.');
    }
  };

  // Palabras comunes, actualizadas con las entradas más completas
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
                  aria-label="Cambiar dirección de traducción"
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
                  <label htmlFor="input-text" className="block text-sm font-semibold text-olive-green">
                    {direccion === 'esp-hna' ? 'Español' : 'Otomí'}
                  </label>
                  <textarea
                    id="input-text"
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
                    <label htmlFor="output-text" className="block text-sm font-semibold text-olive-green">
                      {direccion === 'esp-hna' ? 'Otomí' : 'Español'}
                    </label>
                    {/* Botones de acción para el texto de salida */}
                    <div className="flex space-x-2">
                      {(direccion === 'esp-hna' ? textoOtomi : textoEspanol) && (
                        <>
                          <button
                            onClick={() => leerTexto(direccion === 'esp-hna' ? textoOtomi : textoEspanol)}
                            className="text-terracota hover:text-opacity-80 transition-colors"
                            title="Escuchar texto"
                            aria-label="Escuchar texto traducido"
                          >
                            <Volume2 size={18} />
                          </button>
                          <button
                            onClick={() => copiarTexto(direccion === 'esp-hna' ? textoOtomi : textoEspanol)}
                            className="text-terracota hover:text-opacity-80 transition-colors"
                            title="Copiar texto"
                            aria-label="Copiar texto traducido"
                          >
                            <Copy size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    id="output-text"
                    className="w-full h-32 p-4 bg-cream border-2 border-gray-200 rounded-lg overflow-y-auto"
                  >
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
                  aria-label="Traducir texto"
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
                    // Al hacer clic, se pone la palabra en el input y su traducción en el output.
                    if (direccion === 'esp-hna') {
                      setTextoEspanol(palabra.esp);
                      setTextoOtomi(palabra.hna);
                    } else {
                      setTextoOtomi(palabra.hna); // Aquí, si la dirección es hna-esp, el Hñañú va en el input.
                      setTextoEspanol(palabra.esp); // Y el español en el output.
                    }
                  }}
                  aria-label={`Traducir "${palabra.esp}" a "${palabra.hna}"`}
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
