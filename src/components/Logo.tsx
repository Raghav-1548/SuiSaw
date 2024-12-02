import React from 'react';
import { Cpu } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 group">
      <div className="relative">
        <Cpu 
          size={32} 
          className="text-accent transform transition-transform group-hover:rotate-180 duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-accent/20 blur-lg rounded-full scale-150 animate-pulse" />
      </div>
      <span className="text-2xl font-bold text-accent">
        Sui<span className="text-accent-hover">Saw</span>
      </span>
    </div>
  );
};

export default Logo;