import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedModels from '../components/FeaturedModels';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedModels />
    </main>
  );
};

export default HomePage;