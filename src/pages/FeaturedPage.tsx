import React from 'react';
import { useModelStore } from '../store/modelStore';

const FeaturedPage = () => {
  const { models } = useModelStore();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-accent mb-8 animate-slide-up">
          Featured Models
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model) => (
            <div
              key={model.modelId}
              className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 animate-fade-in"
            >
              <h2 className="text-xl font-semibold text-accent mb-2">{model.modelName}</h2>
              <p className="text-gray-400 mb-4">{model.modelDescription}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">By {model.uploaderAddress.slice(0, 6)}...</span>
                <span className="text-accent font-semibold">${model.pricePerHour}/hr</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPage;