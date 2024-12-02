import React from 'react';
import { useRentalStore } from '../../store/rentalStore';
import { useModelStore } from '../../store/modelStore';
import RentalHistoryCard from './RentalHistoryCard';
import { FileQuestion } from 'lucide-react';

interface RentalHistoryListProps {
  userId: string;
}

const RentalHistoryList = ({ userId }: RentalHistoryListProps) => {
  const { getUserRentals } = useRentalStore();
  const { models } = useModelStore();
  const rentals = getUserRentals(userId);

  if (rentals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileQuestion className="w-16 h-16 text-accent/50 mb-4" />
        <h3 className="text-xl font-semibold text-accent mb-2">No Rentals Found</h3>
        <p className="text-gray-400 mb-6">You haven't rented any models yet.</p>
        <a
          href="/featured"
          className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all duration-300"
        >
          Browse Models
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {rentals.map((rental) => {
        const model = models.find(m => m.modelId === rental.modelId);
        if (!model) return null;

        return (
          <div key={rental.id} className="animate-fade-in">
            <RentalHistoryCard rental={rental} model={model} />
          </div>
        );
      })}
    </div>
  );
};

export default RentalHistoryList;