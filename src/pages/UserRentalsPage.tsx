import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import RentalHistoryList from '../components/rental/RentalHistoryList';
import { History } from 'lucide-react';

const UserRentalsPage = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <History className="w-8 h-8 text-accent" />
          <div>
            <h1 className="text-4xl font-bold text-accent">Rental History</h1>
            <p className="text-gray-400 mt-1">
              View and manage your model rentals
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10">
            <RentalHistoryList userId={user.suiAddress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRentalsPage;