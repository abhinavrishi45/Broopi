import React from 'react';
import ServiceHero from './ServiceHero';
import HerodisplayCard from './HerodisplayCard';
import Footer from './Footer';

const Hero = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full">
        <ServiceHero />
      </header>
      <main className="flex-1 w-full">
        <HerodisplayCard />
      </main>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Hero;
