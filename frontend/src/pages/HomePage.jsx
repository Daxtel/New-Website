import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import TrustedBy from '../components/sections/TrustedBy';
import FeaturedWork from '../components/sections/FeaturedWork';
import Services from '../components/sections/Services';
import WhyUs from '../components/sections/WhyUs';
import Process from '../components/sections/Process';
import CTASection from '../components/sections/CTASection';
import { useSEO } from '../hooks/useSEO';

const HomePage = () => {
  useSEO('home');
  
  return (
    <Layout>
      <Hero />
      <TrustedBy />
      <FeaturedWork />
      <Services />
      <WhyUs />
      <Process />
      <CTASection />
    </Layout>
  );
};

export default HomePage;
