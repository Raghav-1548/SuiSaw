import React from 'react';
import { ArrowRight, Cloud, Server } from 'lucide-react';

interface UploadTypeSelectorProps {
  value: 'direct' | 'hosted';
  onChange: (type: 'direct' | 'hosted') => void;
}

const UploadTypeSelector = ({ value, onChange }: UploadTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button
        type="button"
        onClick={() => onChange('direct')}
        className={`p-6 rounded-xl border transition-all duration-300 flex flex-col items-center text-center ${
          value === 'direct'
            ? 'border-accent bg-accent/10 shadow-lg scale-105'
            : 'border-accent/10 bg-black/40 hover:border-accent/30'
        }`}
      >
        <Server className={`w-8 h-8 mb-4 ${value === 'direct' ? 'text-accent' : 'text-gray-400'}`} />
        <h3 className="text-lg font-semibold text-accent mb-2">Direct Model Upload</h3>
        <p className="text-sm text-gray-400">Upload your model directly with API key and system instructions</p>
        {value === 'direct' && (
          <ArrowRight className="w-5 h-5 text-accent mt-4 animate-pulse" />
        )}
      </button>

      <button
        type="button"
        onClick={() => onChange('hosted')}
        className={`p-6 rounded-xl border transition-all duration-300 flex flex-col items-center text-center ${
          value === 'hosted'
            ? 'border-accent bg-accent/10 shadow-lg scale-105'
            : 'border-accent/10 bg-black/40 hover:border-accent/30'
        }`}
      >
        <Cloud className={`w-8 h-8 mb-4 ${value === 'hosted' ? 'text-accent' : 'text-gray-400'}`} />
        <h3 className="text-lg font-semibold text-accent mb-2">Hosted Model</h3>
        <p className="text-sm text-gray-400">Connect your externally hosted model via URL endpoint</p>
        {value === 'hosted' && (
          <ArrowRight className="w-5 h-5 text-accent mt-4 animate-pulse" />
        )}
      </button>
    </div>
  );
};

export default UploadTypeSelector;