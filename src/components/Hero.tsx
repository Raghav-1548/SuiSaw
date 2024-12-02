import React from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-slide-up">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            <span className="block text-accent hover:text-accent-hover transition-colors duration-300">Upload Beyond,</span>
            <span className="block text-accent hover:text-accent-hover transition-colors duration-300">Rent Beyond</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in">
            Discover and rent cutting-edge AI models from creators worldwide. Transform your projects with access to premium LLMs and more.
          </p>
          
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent group-hover:scale-110 transition-transform duration-300" size={20} />
              <input
                type="text"
                placeholder="Search for models..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-accent/20 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-black/40 text-white placeholder-gray-500 transition-all duration-300 hover:shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;