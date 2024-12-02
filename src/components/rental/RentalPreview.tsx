import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Bot } from 'lucide-react';
import { Rental } from '../../types/rental';
import { Model } from '../../types/model';
import RentalStatusBadge from './RentalStatusBadge';

interface RentalPreviewProps {
  rental: Rental;
  model: Model;
}

const RentalPreview = ({ rental, model }: RentalPreviewProps) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 hover:bg-accent/5 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Bot className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-accent">{model.modelName}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(rental.startTime, { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
      <RentalStatusBadge status={rental.status} />
    </div>
  );
};

export default RentalPreview;