import React from 'react';
import { Clock, MapPin, Users, Book } from 'lucide-react';

const Historia = () => {
  return (
    <div className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-olive-green mb-6">Nuestra Historia</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Descubre las raíces y tradiciones que han forjado nuestra comunidad a lo largo de los años.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-terracota">
              <div className="flex items-center mb-4">
                <div className="bg-terracota p-3 rounded-full mr-4">
                  <MapPin className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-olive-green">Orígenes y Fundación</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Patria Nueva, antiguamente conocido como Barrio del Capulín, tiene sus raíces cuando los fundadores del ejido solicitaron la repartición de tierras que pertenecieron a la exhacienda Ocotza, actualmente en Julián Villagrán, Ixmiquilpan.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Inicialmente, formaron parte de la comunidad de Yolotepec con el nombre de Ejido del Capulín. Los enviados del gobierno intentaron comenzar la repartición de tierras allí, pero no fueron bien recibidos y no regresaron.
              </p>
              <div className="bg-sky-blue bg-opacity-20 rounded-lg p-4 mt-4">
                <p className="text-olive-green font-semibold text-sm">
                  La iglesia principal del pueblo está dedicada a la Virgen María, un pilar de nuestra fe y comunidad.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-sky-blue">
              <div className="flex items-center mb-4">
                <div className="bg-sky-blue p-3 rounded-full mr-4">
                  <Book className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-olive-green">Breve Crónica Histórica</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                El libro narra cuando los fundadores del ejido solicitaron la repartición de tierras las cuales pertenecieron a la exhacienda Ocotza, que en la actualidad están ubicadas en la comunidad de Julián Villagrán, municipio de Ixmiquilpan.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Primero formamos parte de la comunidad de Yolotepec, con el nombre de Ejido del Capulín, hasta ahí llegaron los enviados del gobierno, para poder comenzar con la repartición de tierras, sin embargo ahí no fueron bien recibidos por lo que ya no regresaron.
              </p>
              <div className="mt-6 p-4 bg-cream rounded-lg border-l-4 border-terracota">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Autor:</strong> Horacio Hernández Gómez
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Disponibilidad:</strong> Disponible para consulta en la delegación.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-olive-green to-sky-blue rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Datos Históricos</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Repartición de Tierras</p>
                    <p className="text-cream text-sm">Desde la exhacienda Ocotza</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Nombre Original</p>
                    <p className="text-cream text-sm">Barrio del Capulín / Ejido del Capulín</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Comunidad Madre</p>
                    <p className="text-cream text-sm">Yolotepec</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-64 bg-gradient-to-r from-terracota to-olive-green flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin size={48} className="mx-auto mb-4" />
                  <p className="text-lg font-semibold">Patria Nueva</p>
                  <p className="text-sm opacity-90">Antiguamente Barrio del Capulín</p>
                  <p className="text-xs opacity-75 mt-2">Santiago de Anaya, Hidalgo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historia;