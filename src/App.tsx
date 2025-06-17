import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Historia from './components/Historia';
import Anuncios from './components/Anuncios';
import Eventos from './components/Eventos';
import Servicios from './components/Servicios';
import Traductor from './components/Traductor';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <section id="inicio">
          <Hero />
        </section>
        <section id="historia">
          <Historia />
        </section>
        <section id="anuncios">
          <Anuncios />
        </section>
        <section id="eventos">
          <Eventos />
        </section>
        <section id="servicios">
          <Servicios />
        </section>
        <section id="traductor">
          <Traductor />
        </section>
        <section id="contacto">
          <Contacto />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;