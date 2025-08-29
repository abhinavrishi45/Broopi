import React from 'react';
import ServiceHero from './ServiceHero';
import HerodisplayCard from './HerodisplayCard';
import Footer from './Footer';

const Hero = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="w-full">
        <ServiceHero />
      </header>

      {/* Main Sections */}
      <main className="flex-1 w-full">
        <HerodisplayCard />
      </main>

      {/* Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Hero;
