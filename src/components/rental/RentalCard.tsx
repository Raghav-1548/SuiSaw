import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Clock, CheckCircle2, XCircle, X } from 'lucide-react';
import { Rental } from '../../types/rental';
import { Model } from '../../types/model';
import { useRentalStore } from '../../store/rentalStore';

interface RentalCardProps {
  rental: Rental;
  model: Model;
}

const RentalCard = ({ rental, model }: RentalCardProps) => {
  const { endRental } = useRentalStore();

  const getStatusIcon = () => {
    switch (rental.status) {
      case 'active':
        return <Clock className="w-5 h-5 text-green-500" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-accent" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = () => {
    switch (rental.status) {
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
    }
  };

  const handleStopRental = () => {
    if (window.confirm('Are you sure you want to stop renting this model?')) {
      endRental(rental.id);
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-accent/10 hover:border-accent/20 transition-colors duration-300 relative group">
      {rental.status === 'active' && (
        <button
          onClick={handleStopRental}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors duration-300 opacity-0 group-hover:opacity-100"
          title="Stop Rental"
        >
          <X size={20} />
        </button>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-accent mb-1">{model.modelName}</h3>
          <p className="text-sm text-gray-400 mb-2">
            From: {model.uploaderAddress.slice(0, 6)}...{model.uploaderAddress.slice(-4)}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Rented:</span>
            <span className="text-accent">{formatDistanceToNow(rental.startTime)} ago</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/20">
          {getStatusIcon()}
          <span className="text-sm text-gray-400">{getStatusText()}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-400">
        {rental.endTime && (
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>
              {formatDistanceToNow(rental.startTime, { end: rental.endTime })}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Cost:</span>
          <span className="text-accent">{rental.pricePerHour} SUI/hr</span>
        </div>
      </div>

      {rental.status === 'active' && (
        <div className="mt-4 pt-4 border-t border-accent/10">
          <button
            onClick={() => window.location.href = '/llm-chat'}
            className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all duration-300"
          >
            Continue Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default RentalCard;