import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { Clock, User, Calendar, DollarSign, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Rental } from '../../types/rental';
import { Model } from '../../types/model';
import { useRentalStore } from '../../store/rentalStore';
import RentalStatusBadge from './RentalStatusBadge';

interface RentalHistoryCardProps {
  rental: Rental;
  model: Model;
}

const RentalHistoryCard = ({ rental, model }: RentalHistoryCardProps) => {
  const { endRental } = useRentalStore();

  const handleEndRental = () => {
    if (window.confirm('Are you sure you want to end this rental?')) {
      endRental(rental.id);
    }
  };

  const calculateCost = () => {
    const start = rental.startTime;
    const end = rental.endTime || Date.now();
    const hours = (end - start) / (1000 * 60 * 60);
    return (hours * rental.pricePerHour).toFixed(2);
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 hover:border-accent/20 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-accent">{model.modelName}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
            <User size={14} />
            <span>Owner: {model.uploaderAddress.slice(0, 6)}...{model.uploaderAddress.slice(-4)}</span>
          </div>
        </div>
        <RentalStatusBadge status={rental.status} />
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between py-2 border-b border-accent/10">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={14} />
            <span>Started</span>
          </div>
          <span className="text-accent">
            {format(rental.startTime, 'PPp')}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-accent/10">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock size={14} />
            <span>Duration</span>
          </div>
          <span className="text-accent">
            {formatDistanceToNow(rental.startTime, { addSuffix: true })}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-accent/10">
          <div className="flex items-center gap-2 text-gray-400">
            <DollarSign size={14} />
            <span>Cost</span>
          </div>
          <span className="text-accent">
            {calculateCost()} SUI
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {rental.status === 'active' && (
          <>
            <Link
              to="/llm-chat"
              className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} />
              <span>Continue Chat</span>
            </Link>
            <button
              onClick={handleEndRental}
              className="w-full px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all duration-300"
            >
              End Rental
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RentalHistoryCard;