import React from 'react';
import { useRentalStore } from '../../store/rentalStore';
import { useModelStore } from '../../store/modelStore';
import RentalCard from './RentalCard';

interface RentalsListProps {
  userId: string;
}

const RentalsList = ({ userId }: RentalsListProps) => {
  const { getUserRentals } = useRentalStore();
  const { models } = useModelStore();
  const rentals = getUserRentals(userId);

  if (rentals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No rentals found</p>
        <a
          href="/featured"
          className="inline-block mt-4 px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all duration-300"
        >
          Browse Models
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rentals.map((rental) => {
        const model = models.find(m => m.modelId === rental.modelId);
        if (!model) return null;

        return (
          <div key={rental.id} className="animate-fade-in">
            <RentalCard rental={rental} model={model} />
          </div>
        );
      })}
    </div>
  );
};

export default RentalsList;