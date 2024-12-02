import React from 'react';
import { Star, Clock, Tag } from 'lucide-react';
import RentButton from './rental/RentButton';

interface ModelCardProps {
  modelId: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  author: string;
  image: string;
}

const ModelCard = ({ modelId, title, description, price, rating, author, image }: ModelCardProps) => {
  return (
    <div className="group bg-black/40 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-accent/10 hover:scale-105 transform">
      <div className="aspect-video w-full overflow-hidden bg-black/60">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-accent group-hover:text-accent-hover transition-colors duration-300">{title}</h3>
          {rating > 0 && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-accent fill-current group-hover:scale-110 transition-transform duration-300" />
              <span className="ml-1 text-sm text-gray-400">{rating}</span>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="w-4 h-4 mr-1 text-accent group-hover:rotate-12 transition-transform duration-300" />
            <span>By {author}</span>
          </div>
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-1 text-accent group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-semibold text-accent group-hover:text-accent-hover transition-colors duration-300">{price} SUI/Tok</span>
          </div>
        </div>
        <RentButton modelId={modelId} pricePerHour={price} />
      </div>
    </div>
  );
};

export default ModelCard;