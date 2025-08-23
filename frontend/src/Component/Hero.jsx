import React from 'react';
import ServiceHero from './ServiceHero';
import HerodisplayCard from './HerodisplayCard';
import Footer from './Footer';

const Hero = () => {
  return (
    <div>
      <ServiceHero />
      <HerodisplayCard/>
      <Footer></Footer>
    </div>
  );
};

export default Hero;
