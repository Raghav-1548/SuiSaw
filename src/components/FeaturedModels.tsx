import React from 'react';
import ModelCard from './ModelCard';
import { useModelStore } from '../store/modelStore';

const FeaturedModels = () => {
  const { models } = useModelStore();

  // Hardcoded featured models
  const featuredModels = [
    {
      modelId: "gpt4-medical",
      title: "GPT-4 Fine-tuned for Medical",
      description: "Specialized medical knowledge base with enhanced diagnostic capabilities",
      price: 25,
      rating: 4.8,
      author: "HealthAI Labs",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80"
    },
    {
      modelId: "financial-llm",
      title: "Financial Analysis LLM",
      description: "Expert system for market analysis and financial forecasting",
      price: 30,
      rating: 4.9,
      author: "QuantumFinance",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80"
    },
    {
      modelId: "multilingual-pro",
      title: "Multilingual Assistant Pro",
      description: "Advanced language model supporting 95+ languages with cultural context",
      price: 20,
      rating: 4.7,
      author: "GlobalLing AI",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80"
    }
  ];

  // Convert user-uploaded models to the format expected by ModelCard
  const userModels = models.map(model => ({
    modelId: model.modelId,
    title: model.modelName,
    description: model.modelDescription,
    price: model.pricePerHour,
    rating: 0, // New models start with no rating
    author: `${model.uploaderAddress.slice(0, 6)}...${model.uploaderAddress.slice(-4)}`,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80" // Default image for user models
  }));

  // Combine both arrays, putting user models first
  const allModels = [...userModels, ...featuredModels];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-accent mb-8 animate-slide-up">Featured Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allModels.map((model, index) => (
            <div
              key={model.modelId}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <ModelCard {...model} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedModels;