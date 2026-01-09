import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import FeaturedWork from '../components/sections/FeaturedWork';
import Services from '../components/sections/Services';
import WhyUs from '../components/sections/WhyUs';
import Process from '../components/sections/Process';
import CTASection from '../components/sections/CTASection';

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedWork />
      <Services />
      <WhyUs />
      <Process />
      <CTASection />
    </Layout>
  );
};

export default HomePage;
