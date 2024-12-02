import React from 'react';
import { Brain, MessageSquare, Code, LineChart, Microscope, Globe } from 'lucide-react';

const Categories = () => {
  const categories = [
    { name: 'General Purpose', icon: Brain, count: 156 },
    { name: 'Conversational', icon: MessageSquare, count: 89 },
    { name: 'Code Generation', icon: Code, count: 124 },
    { name: 'Data Analysis', icon: LineChart, count: 67 },
    { name: 'Scientific', icon: Microscope, count: 45 },
    { name: 'Multilingual', icon: Globe, count: 78 }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-accent mb-8 animate-slide-up">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map(({ name, icon: Icon, count }, index) => (
            <div
              key={name}
              className="flex flex-col items-center p-6 bg-black/40 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-accent/10 hover:scale-105 transform animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Icon className="w-8 h-8 text-accent mb-3 transform transition-transform group-hover:rotate-12" />
              <h3 className="text-sm font-semibold text-accent text-center mb-1">{name}</h3>
              <span className="text-sm text-gray-400">{count} models</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;